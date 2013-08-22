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

  describe "#connect_accounts" do
    before(:each) do
      @user2 = Factory(:user)
    end

    it "should delete the second account" do
      @user.connect(@user2)
      User.exists?(@user2.id).should be_false
    end

    it "should transfer all organized trips from second account to first account" do
      trip = Factory(:trip, :organizer => @user2)
      @user.connect(@user2)

      trip.reload
      trip.organizer.should eq @user
    end

    it "should transfer all expenses from second account to first account" do
      trip = Factory(:trip, :organizer => @user2)
      expense = Factory(:expense, :purchaser => @user2, :trip => trip)
      @user.connect(@user2)

      expense.reload
      expense.purchaser.should eq @user
    end

    it "should transfer all memberships from second account to first account" do
      trip = Factory(:trip, :organizer => Factory(:user))
      membership = trip.add_member(@user2)
      @user.connect(@user2)

      membership.reload
      membership.user.should eq @user
    end

    it "should transfer all contributions from second account to first account" do
      contribution = Factory(:contribution, :user => @user2)

      @user.connect(@user2)

      contribution.reload
      contribution.user.should eq @user
    end

    it "should transfer all contributions from second account to first account" do
      obligation = Factory(:obligation, :user => @user2)

      @user.connect(@user2)

      obligation.reload
      obligation.user.should eq @user
    end

    it "should transfer all friendships from second account to first account" do
      friendship = Factory(:friendship, :user => @user2)
      @user.connect(@user2)

      friendship.reload
      friendship.user.should eq @user
    end

    it "should transfer all friendships tied to second account from other users to first account" do
      friendship = Factory(:friendship, :friend => @user2)
      @user.connect(@user2)

      friendship.reload
      friendship.friend.should eq @user
    end

    it "should transfer over all facebook fields" do
      now = Time.now
      user3 = Factory(:user, :facebook_id => "1", :facebook_access_token_expires_at => now, :facebook_access_token => "12345")
      @user.connect(user3)
      @user.facebook_id.should eq "1"
      @user.facebook_access_token_expires_at.should eq now
      @user.facebook_access_token.should eq "12345"
    end

    it "should transfer over all twitter fields" do
      now = Time.now
      user3 = Factory(:user, :twitter_id => "1", :twitter_access_token => "9876", :twitter_access_secret => "12345")
      @user.connect(user3)
      @user.twitter_id.should eq "1"
      @user.twitter_access_token.should eq "9876"
      @user.twitter_access_secret.should eq "12345"
    end
  end
end
