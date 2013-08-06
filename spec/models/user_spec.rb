require 'spec_helper'

describe User do
  before(:each) do
    @user = Factory(:user)
  end

  describe "total_trip_purchases_cost" do
    before(:each) do
      @trip = Factory(:trip)
      @trip.add_member(@user)
      @user.purchases << Factory(:expense, :cost => 10, :trip => @trip)
      @user.purchases << Factory(:expense, :cost => 30, :trip => @trip)
    end

    it "should total all costs of trip at $40" do
      @user.total_trip_purchases_cost(@trip).should eq 40
    end

    it "should not add expense from differnet trip" do
      @user.purchases << Factory(:expense, :cost => 100)
      @user.total_trip_purchases_cost(@trip).should eq 40
    end
  end

  describe "#total_purchases_cost" do
    before(:each) do
      @trip = Factory(:trip)
      @trip.add_member(@user)
      @user.purchases << Factory(:expense, :cost => 10, :trip => @trip)
      @user.purchases << Factory(:expense, :cost => 30, :trip => @trip)
      @user.purchases << Factory(:expense, :cost => 100)
    end

    it "should total all purchases from different trips to $140" do
    	@user.total_purchases_cost.should eq 140
    end
  end

  describe "#amount_owed_from" do
    before(:each) do
      @member = Factory(:user)
      @trip = Factory(:trip, :organizer => @user)
      @trip.add_member(@member)
      @expense = Factory(:expense, :purchaser => @user, :cost => 100, :trip => @trip)
      @trip.reload
    end

    it "should return $50 since user paid $100 for expense" do
      @user.amount_owed_from(@member).should eq 50
    end

    it "should return $25 since user paid $100 for expense and member paid $50 for another" do
      Factory(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      @user.amount_owed_from(@member).should eq 25
    end

    it "should return $25 since user paid $100 for expense and member contributed $25" do
      Factory(:contribution, :amount => 25, :user => @member, :expense => @expense)
      @user.amount_owed_from(@member).should eq 25
    end

    it "should return $50 since user paid $100 for expense and user contributed $25 to member's expense" do
      member_expense = Factory(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      Factory(:contribution, :amount => 25, :user => @user, :expense => member_expense)
      @user.amount_owed_from(@member).should eq 50
    end

    it "should return 0 if there are no expenses" do
      @expense.destroy
      @user.amount_owed_from(@member).should eq 0
    end

    it "should return 0 if the user owes the member money" do
      Factory(:expense, :purchaser => @member, :cost => 150, :trip => @trip)
      @user.amount_owed_from(@member).should eq 0
    end
  end

  describe "#amount_due_to" do
    before(:each) do
      @member = Factory(:user)
      @trip = Factory(:trip, :organizer => @user)
      @trip.add_member(@member)
      @expense = Factory(:expense, :purchaser => @user, :cost => 100, :trip => @trip)
      @trip.reload
    end

    it "should return $50 since user paid $100 for expense" do
      @member.amount_due_to(@user).should eq 50
    end

    it "should return $25 since user paid $100 for expense and member paid $50 for another" do
      Factory(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      @member.amount_due_to(@user).should eq 25
    end

    it "should return $25 since user paid $100 for expense and member contributed $25" do
      Factory(:contribution, :amount => 25, :user => @member, :expense => @expense)
      @member.amount_due_to(@user).should eq 25
    end

    it "should return $50 since user paid $100 for expense and user contributed $25 to member's expense" do
      member_expense = Factory(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      Factory(:contribution, :amount => 25, :user => @user, :expense => member_expense)
      @member.amount_due_to(@user).should eq 50
    end

    it "should return 0 if there are no expenses" do
      @expense.destroy
      @member.amount_due_to(@user).should eq 0
    end

    it "should return 0 if the user owes the member money" do
      Factory(:expense, :purchaser => @member, :cost => 150, :trip => @trip)
      @member.amount_due_to(@user).should eq 0
    end
  end
end
