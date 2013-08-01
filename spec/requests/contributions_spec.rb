require "spec_helper"
require 'support/auth_helper'

describe "/contributions" do
  include AuthHelper

  before(:each) do
    @user = Factory(:user)
    @trip = Factory(:trip, :organizer => @user)
    @user2 = Factory(:user)
    @trip.add_member(@user2)
    @expense = Factory(:expense, :trip => @trip, :purchaser => @user, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
  end

  describe "GET /contributions" do
    it "should return a list of contributions purchased on a trip" do
      get "/expenses/#{@expense.id}/contributions", {:format => :json}, auth_parameters

      response.should be_ok
      contributions = JSON.parse(response.body)

      contributions.collect{|x| x['id']}.should eq @user.contributions.where(:expense_id => @expense.id).collect(&:id)
    end

    it "should not return an expense from another user" do
      other_expense = Factory(:expense)

      get "/expenses/#{other_expense.id}/contributions", {:format => :json}, auth_parameters

      response.should be_ok
      contributions = JSON.parse(response.body)

      contributions.collect{|x| x['id']}.should_not include other_expense.id
    end

  end

  describe "POST /expenses/1/contributions" do

    it "should create an contribution with all the attributes" do
      post "/expenses/#{@expense.id}/contributions", {:format => :json, :expense_contribution => {:amount => 20}}, auth_parameters(@user2)

      response.status.should eq 201
      contribution = JSON.parse(response.body)
      @user2.reload.contributions.first.amount.should eq 20
    end
  end

  describe "PUT /contributions/:id" do
    before(:each) do
      @user2.add_contribution(@expense, 20)
    end

    it "should update an contribution with all the attributes" do
      put "/contributions/#{@user2.contributions.first.id}", {:format => :json, :expense_contribution => {:amount => 50}}, auth_parameters(@user2)

      response.status.should eq 204

      @user2.contributions.reload.first.amount.should eq 50
    end

    it "should not update an contribution for another user" do
      expect {
        put "/contributions/#{@user2.contributions.first.id}", {:format => :json, :contribution => {:amount => 20}}, auth_parameters(@user)
      }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

end
