require "spec_helper"
require 'support/auth_helper'

describe "/contributions", type: :request do
  include AuthHelper

  before(:each) do
    @organizer = FactoryGirl.create(:user)
    @trip = FactoryGirl.create(:trip, :organizer => @organizer)
    @user2 = FactoryGirl.create(:user)
    @trip.add_member(@user2)
    @user3 = FactoryGirl.create(:user)
    @trip.add_member(@user3)
    @expense = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @organizer, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
  end

  describe "GET /contributions" do
    before(:each) do
      @user2.add_contribution(@expense, 20)
    end

    it "should return a list of contributions made by a user" do
      get "/contributions", {:format => :json}, auth_parameters(@user2)

      response.should be_ok
      contributions = JSON.parse(response.body)

      contributions.size.should eq 1
      contributions.collect{|x| x['id']}.should eq @user2.contributions.where(:expense_id => @expense.id).collect(&:id)
    end

    it "should return a list of contributions made on an expense" do
      get "/expenses/#{@expense.id}/contributions", {:format => :json}, auth_parameters(@organizer)

      response.should be_ok
      contributions = JSON.parse(response.body)

      contributions.size.should eq 1
      contributions.collect{|x| x['id']}.should eq @expense.contributions.where(:expense_id => @expense.id).collect(&:id)
    end

    it "should not return a contributions from another user" do
      get "/contributions", {:format => :json}, auth_parameters(@user3)

      response.should be_ok
      contributions = JSON.parse(response.body)

      contributions.should be_empty
    end

    it "should return a contributions from another expense" do
      other_expense = FactoryGirl.create(:expense)
      other_contribution = @user2.add_contribution(other_expense, 20)

      get "/expenses/#{@expense.id}/contributions", {:format => :json}, auth_parameters

      response.should be_ok
      contributions = JSON.parse(response.body)

      contributions.size.should eq 1
      contributions.collect{|x| x['id']}.should_not include other_contribution.id
    end
  end

    describe "GET /contributions/:id" do
    before(:each) do
      @contribution = @user2.add_contribution(@expense, 20)
    end

    it "should return a contribution made by a user" do
      get "/contributions/#{@contribution.id}", {:format => :json}, auth_parameters(@user2)

      response.should be_ok
      contribution = JSON.parse(response.body)

      contribution['id'].should eq @contribution.id
    end

    it "should not return a contribution made by another user" do
      expect { get "/contributions/#{@contribution.id}", {:format => :json}, auth_parameters(@user3) }.to raise_exception ActiveRecord::RecordNotFound
    end

    it "should return a contribution from another user if organizer" do
      expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      contribution2 = @user3.add_contribution(expense2, 20)

      get "/contributions/#{contribution2.id}", {:format => :json}, auth_parameters(@organizer)

      response.should be_ok
      contribution = JSON.parse(response.body)

      contribution['id'].should eq contribution2.id
    end

    it "should return a contribution from another user if purchaser" do
      expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      contribution2 = @user3.add_contribution(expense2, 20)

      get "/contributions/#{contribution2.id}", {:format => :json}, auth_parameters(@user2)

      response.should be_ok
      contribution = JSON.parse(response.body)

      contribution['id'].should eq contribution2.id
    end
  end

  describe "POST /expenses/1/contributions" do

    it "should create an contribution with all the attributes" do
      post "/expenses/#{@expense.id}/contributions", {:format => :json, :expense_contribution => {:amount => 20}}, auth_parameters(@user2)

      response.status.should eq 201
      contribution = JSON.parse(response.body)
      @user2.reload.contributions.first.amount.should eq 20
    end

    it "should let the organizer of the trip create contributions for another member" do
      @expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      post "/expenses/#{@expense2.id}/contributions", {:format => :json, :expense_contribution => {:user_id => @user3.id, :amount => 20}}, auth_parameters(@organizer)

      response.status.should eq 201
      contribution = JSON.parse(response.body)
      @user3.reload.contributions.first.amount.should eq 20
    end

    it "should let the purchaser of the expense create contributions for another member" do
      @expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      post "/expenses/#{@expense2.id}/contributions", {:format => :json, :expense_contribution => {:user_id => @user3.id, :amount => 20}}, auth_parameters(@user2)

      response.status.should eq 201
      contribution = JSON.parse(response.body)
      @user3.reload.contributions.first.amount.should eq 20
    end

    it "should not let a non-organizer of the trip create contributions for another member" do
      post "/expenses/#{@expense.id}/contributions", {:format => :json, :expense_contribution => {:user_id => @organizer.id, :amount => 20}}, auth_parameters(@user2)

      response.status.should eq 422
    end

    it "should not let the purchaser of the expense create a contribution for themself" do
      post "/expenses/#{@expense.id}/contributions", {:format => :json, :expense_contribution => {:user_id => @organizer.id, :amount => 20}}, auth_parameters(@organizer)

      response.status.should eq 422
    end
  end

  describe "PUT /contributions/:id" do
    before(:each) do
      @user2.add_contribution(@expense, 20)
    end

    it "should update a contribution with all the attributes" do
      put "/contributions/#{@user2.contributions.first.id}", {:format => :json, :expense_contribution => {:amount => 50}}, auth_parameters(@user2)

      response.status.should eq 204

      @user2.contributions.reload.first.amount.should eq 50
    end

    it "should not update an contribution for another user" do
      expect {
        put "/contributions/#{@user2.contributions.first.id}", {:format => :json, :contribution => {:amount => 20}}, auth_parameters(@user3)
      }.to raise_exception ActiveRecord::RecordNotFound
    end

    it "should update a contribution from another user if organizer" do
      expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      contribution2 = @user3.add_contribution(expense2, 20)

      put "/contributions/#{contribution2.id}", {:format => :json, :expense_contribution => {:amount => 50}}, auth_parameters(@organizer)

      response.status.should eq 204

      contribution2.reload.amount.should eq 50
    end

    it "should update a contribution from another user if purchaser" do
      expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      contribution2 = @user3.add_contribution(expense2, 20)

      put "/contributions/#{contribution2.id}", {:format => :json, :expense_contribution => {:amount => 50}}, auth_parameters(@user2)

      response.status.should eq 204

      contribution2.reload.amount.should eq 50
    end
  end

  describe "DELETE /contributions/:id" do
    before(:each) do
      @contribution = @user2.add_contribution(@expense, 20)
    end

    it "should delete a contribution with all the attributes" do
      delete "/contributions/#{@contribution.id}", {:format => :json, :expense_contribution => {:amount => 50}}, auth_parameters(@user2)

      ExpenseContribution.exists?(@contributionid).should eq false
    end

    it "should not delete an contribution for another user" do
      expect {
        delete "/contributions/#{@contribution.id}", {:format => :json}, auth_parameters(@user3)
      }.to raise_exception ActiveRecord::RecordNotFound

      ExpenseContribution.exists?(@contribution.id).should eq true
    end

    it "should delete a contribution from another user if organizer" do
      expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      contribution2 = @user3.add_contribution(expense2, 20)

      delete "/contributions/#{contribution2.id}", {:format => :json}, auth_parameters(@organizer)

      ExpenseContribution.exists?(contribution2.id).should eq false
    end

    it "should delete a contribution from another user if purchaser" do
      expense2 = FactoryGirl.create(:expense, :trip => @trip, :purchaser => @user2, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
      contribution2 = @user3.add_contribution(expense2, 20)

      delete "/contributions/#{contribution2.id}", {:format => :json}, auth_parameters(@user2)

      ExpenseContribution.exists?(contribution2.id).should eq false
    end
  end

end
