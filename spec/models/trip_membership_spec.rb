require 'spec_helper'

describe TripMembership do
  before(:each) do
    @purchaser = FactoryGirl.create(:user)
    @trip = FactoryGirl.create(:trip, :organizer => @purchaser)
    @expense = FactoryGirl.create(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
    @trip.reload
  end

  describe "#add_obligations" do
    it "should re-average the cost after a trip membership is created" do
    	user = FactoryGirl.create(:user)
    	trip_membership = FactoryGirl.create(:trip_membership, :trip => @trip, :user => user)

    	@expense.reload.obligations.size.should eq 2
      @expense.obligations.collect(&:amount).should eq [50, 50]
    end

    it "shouldn't re-average the cost if the expense is a loan" do
      user = FactoryGirl.create(:user)
      @expense.update_attributes(:is_loan => true)
      trip_membership = FactoryGirl.create(:trip_membership, :trip => @trip, :user => user)

      @expense.reload.obligations.size.should eq 1
      @expense.obligations.collect(&:amount).should eq [100]
    end

  end

  describe "#remove_obligations" do
    it "should re-average the cost after a trip membership is destroyed" do
      user = FactoryGirl.create(:user)
      trip_membership = FactoryGirl.create(:trip_membership, :trip => @trip, :user => user)

      @expense.reload.obligations.size.should eq 2
      @expense.obligations.collect(&:amount).should eq [50, 50]

      trip_membership.destroy

      @expense.reload.obligations.size.should eq 1
      @expense.obligations.collect(&:amount).should eq [100]
    end
  end

  describe "#add_friends" do
    it "should add a user that just created the trip membership as a friend to all other members" do
      user = FactoryGirl.create(:user, :name => "John Smith")
      trip_membership = FactoryGirl.create(:trip_membership, :trip => @trip, :user => user)

      @purchaser.friends.first.should eq user
    end

    it "should add all members as friends to the user the just created a trip membership" do
      user = FactoryGirl.create(:user, :name => "John Smith")
      trip_membership = FactoryGirl.create(:trip_membership, :trip => @trip, :user => user)

      user.friends.first.should eq @purchaser
    end
  end
end
