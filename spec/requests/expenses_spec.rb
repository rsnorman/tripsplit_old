require "spec_helper"
require 'support/auth_helper'

describe "/expenses" do
  include AuthHelper

  before(:each) do
    @user = Factory(:user)
    @trip = Factory(:trip, :organizer => @user)
    @expense = Factory(:expense, :trip => @trip, :purchaser => @user, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
  end

  describe "GET /expenses" do
    it "should return a list of expenses purchased on a trip" do
      get "/trips/#{@trip.id}/expenses", {:format => :json}, auth_parameters

      response.should be_ok
      expenses = JSON.parse(response.body)

      expenses.collect{|x| x['id']}.should include @expense.id
    end

    it "should not return an expense from another trip" do
      other_trip = Factory(:trip, :organizer => @user)
      other_expense = Factory(:expense, :trip => other_trip, :purchaser => @user)

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
      other_expense = Factory(:expense)

      expect { get "/expenses/#{other_expense.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

  describe "POST /expenses" do
    it "should create a expense with all the attributes" do
      expense_attrs = Factory.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      post "/trips/#{@trip.id}/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters

      response.status.should eq 201
      expense = JSON.parse(response.body)

      expense['name'].should eq "Nacho Cheese Doritos"
      expense['cost'].should eq "2.0"
      expense['expense_type'].should eq "Food"
    end

    it "should return an error if non-nested resource url is used to purchase expense" do
      expense_attrs = Factory.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      expect { post "/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters }.to raise_exception ActionController::RoutingError
    end

    it "should return an error if trip does not exist that expense is being added to" do
      expense_attrs = Factory.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      expect { post "/trips/1000/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end

    it "should return an error if user is not part of trip that expense is being added to" do
      expense_attrs = Factory.attributes_for(:expense, :name => "Nacho Cheese Doritos", :cost => 2, :expense_type => "Food")
      expense_attrs.delete(:user_id)
      expense_attrs.delete(:trip_id)
      expect { post "/trips/#{Factory(:trip).id}/expenses", {:format => :json, :expense => expense_attrs}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

end
