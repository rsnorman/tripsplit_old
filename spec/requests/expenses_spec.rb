require "spec_helper"
require 'support/auth_helper'

RSpec.describe "/expenses", type: :request do
  include AuthHelper

  before(:each) do
    @user = FactoryGirl.create(:user)
    @trip = FactoryGirl.create(:trip, :organizer => @user)
    @expense = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
  end

  describe "GET /expenses" do
    it "should return a list of expenses purchased on a trip" do
      get "/trips/#{@trip.id}/expenses", {:format => :json}, auth_parameters

      response.should be_ok
      expenses = JSON.parse(response.body)

      expenses.collect{|x| x['id']}.should include @expense.id
    end

    it "should not return an expense from another trip" do
      other_trip = FactoryGirl.create(:trip, :organizer => @user)
      other_expense = FactoryGirl.create(:expense, :trip => other_trip, :purchaser => @user)

      get "/trips/#{@trip.id}/expenses", {:format => :json}, auth_parameters

      response.should be_ok
      expenses = JSON.parse(response.body)

      expenses.collect{|x| x['id']}.should_not include other_expense.id
    end

    it "should include the purchaser for each expense" do
      get "/trips/#{@trip.id}/expenses", {:format => :json}, auth_parameters

      response.should be_ok
      expenses = JSON.parse(response.body)
      expenses.first['purchaser'].should_not be_nil
    end

  end


  describe "GET /expenses/:id" do
    it "should return a expense matching the id" do
      get "/expenses/#{@expense.id}", {:format => :json}, auth_parameters

      response.should be_ok
      expense = JSON.parse(response.body)

      expense['id'].should eq @expense.id
    end

    it "should not return an expense not purchased on one of the user's trips" do
      other_expense = FactoryGirl.create(:expense)

      expect { get "/expenses/#{other_expense.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

  describe "POST /expenses" do
    it "should create a expense with all the attributes" do
      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      post "/trips/#{@trip.id}/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters

      response.status.should eq 201
      expense = JSON.parse(response.body)

      expense['name'].should eq "Nacho Cheese Doritos"
      expense['cost'].should eq "2.0"
      expense['expense_type'].should eq "Food"
    end

    it "should return an error if trip does not exist that expense is being added to" do
      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      expect { post "/trips/1000/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end

    it "should return an error if user is not part of trip that expense is being added to" do
      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      expect { post "/trips/#{FactoryGirl.create(:trip).id}/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end

    it "should set create an obligation for a user through nested attributes" do
      user2 = FactoryGirl.create(:user)
      @trip.add_member(user2)

      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 20, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      obligation_attrs = FactoryGirl.attributes_for(:obligation, :expense => nil, :user_id => user2.id, :amount => 5, :is_average => false)
      obligation_attrs.delete(:expense)
      obligation_attrs.delete(:is_tip)
      post "/trips/#{@trip.id}/expenses", {:format => :json, :expense => expense_attrs.merge(:obligations_attributes => [obligation_attrs])}, auth_parameters

      response.status.should eq 201
      expense = JSON.parse(response.body)

      Expense.find(expense['id']).obligations.where(:user_id => user2.id).first.amount.should eq 5
    end

    it "should remove an obligation for a user through nested attributes" do
      user2 = FactoryGirl.create(:user)
      @trip.add_member(user2)

      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 20, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      obligation_attrs = FactoryGirl.attributes_for(:obligation, :expense => nil, :user_id => user2.id, :amount => 0, :is_average => false)
      obligation_attrs.delete(:expense)
      obligation_attrs.delete(:is_tip)
      post "/trips/#{@trip.id}/expenses", {:format => :json, :expense => expense_attrs.merge(:obligations_attributes => [obligation_attrs])}, auth_parameters

      response.status.should eq 201
      expense = JSON.parse(response.body)
      Expense.find(expense['id']).obligations.size.should eq 2
      Expense.find(expense['id']).obligations.where(:user_id => user2.id).first.amount.should eq 0
    end

    it "should set create a contribution for a user through nested attributes" do
      user2 = FactoryGirl.create(:user)
      @trip.add_member(user2)

      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 20, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      contribution_attrs = FactoryGirl.attributes_for(:contribution, :expense => nil, :user_id => user2.id, :amount => 5)
      contribution_attrs.delete(:expense)
      contribution_attrs.delete(:is_tip)
      post "/trips/#{@trip.id}/expenses", {:format => :json, :expense => expense_attrs.merge(:contributions_attributes => [contribution_attrs])}, auth_parameters

      response.status.should eq 201
      expense = JSON.parse(response.body)

      Expense.find(expense['id']).contributions.where(:user_id => user2.id).first.amount.should eq 5
    end

    it "should set create a contribution for a user through nested attributes that is completely paid" do
      user2 = FactoryGirl.create(:user)
      @trip.add_member(user2)

      expense_attrs = FactoryGirl.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 20, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      contribution_attrs = FactoryGirl.attributes_for(:contribution, :expense => nil, :user_id => user2.id, :is_paid => true)
      contribution_attrs.delete(:expense)
      contribution_attrs.delete(:is_tip)
      post "/trips/#{@trip.id}/expenses", {:format => :json, :expense => expense_attrs.merge(:contributions_attributes => [contribution_attrs])}, auth_parameters

      response.status.should eq 201
      expense = JSON.parse(response.body)

      Expense.find(expense['id']).contributions.where(:user_id => user2.id).first.amount.should eq 10
      Expense.find(expense['id']).contributions.where(:user_id => user2.id).first.is_paid.should eq true
    end

  end

  describe "PUT /expenses" do
    it "should" do
      puts "Need to write tests to make sure update expenses can handle nested attributes"
    end
  end

end
