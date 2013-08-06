require 'spec_helper'

describe TripMembership do
  before(:each) do
    @purchaser = Factory(:user)
    @trip = Factory(:trip, :organizer => @purchaser)
    @expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
    @trip.reload
  end

  it "should re-average the cost after a trip membership is created" do
  	user = Factory(:user)
  	trip_membership = Factory(:trip_membership, :trip => @trip, :user => user)

  	@expense.reload.obligations.size.should eq 2
    @expense.obligations.collect(&:amount).should eq [50, 50]
  end

  it "should re-average the cost after a trip membership is destroyed" do
    user = Factory(:user)
    trip_membership = Factory(:trip_membership, :trip => @trip, :user => user)

    @expense.reload.obligations.size.should eq 2
    @expense.obligations.collect(&:amount).should eq [50, 50]

    trip_membership.destroy

    @expense.reload.obligations.size.should eq 1
    @expense.obligations.collect(&:amount).should eq [100]
  end
end
