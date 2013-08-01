require "spec_helper"
require 'support/auth_helper'

describe "/obligations" do
  include AuthHelper

  before(:each) do
    @user = Factory(:user)
    @trip = Factory(:trip, :organizer => @user)
    @user2 = Factory(:user)
    @trip.add_member(@user2)
    @expense = Factory(:expense, :trip => @trip, :purchaser => @user, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
  end

  describe "GET /expenses/1/obligations" do
    it "should return a list of obligations purchased on a trip" do
      get "/expenses/#{@expense.id}/obligations", {:format => :json}, auth_parameters

      response.should be_ok
      obligations = JSON.parse(response.body)

      obligations.collect{|x| x['id']}.should eq @expense.obligations.where(:expense_id => @expense.id).collect(&:id)
    end

    # it "should not return an expense from another user" do
    #   other_expense = Factory(:expense)

    #   get "/expenses/#{other_expense.id}/obligations", {:format => :json}, auth_parameters

    #   response.should be_ok
    #   obligations = JSON.parse(response.body)

    #   obligations.collect{|x| x['id']}.should_not include other_expense.id
    # end

  end

  describe "POST /expense/:expense_id/obligations/:id" do
    it "should create an obligation with all the attributes" do
      post "/expenses/#{@expense.id}/obligations", {:format => :json, :expense_obligation => {:amount => 10, :name => 'Whisky'} }, auth_parameters

      response.status.should eq 201
      obligation = JSON.parse(response.body)
      obligation['amount'].should eq '10.0'
    end
  end

  describe "PUT /obligations/:id" do
    it "should update an obligation with all the attributes" do
      put "/obligations/#{@user.obligations.first.id}", {:format => :json, :expense_obligation => {:amount => 20}}, auth_parameters

      response.status.should eq 204
    end

    it "should not update an obligation if it will cause the full cost of the expense to not be covered" do
      put "/obligations/#{@user.obligations.first.id}", {:format => :json, :expense_obligation => {:amount => 20}}, auth_parameters
      put "/obligations/#{@user2.obligations.first.id}", {:format => :json, :expense_obligation => {:amount => 20}}, auth_parameters(@user2)

      response.status.should eq 422
      JSON.parse(response.body)['errors']['amount'].should include "Obligation cannot change amount since expense cost will not be covered or will be exceeded"
    end

    it "should readjust the averages of the other obligations after obligation amount is changed" do
      put "/obligations/#{@user.obligations.first.id}", {:format => :json, :expense_obligation => {:amount => 20, :name => nil}}, auth_parameters

      get "/expenses/#{@expense.id}/obligations", {:format => :json}, auth_parameters

      response.should be_ok
      obligations = JSON.parse(response.body)

      obligations.first['amount'].should eq "20.0"
      obligations.last['amount'].should eq "30.0"
    end

  end

end
