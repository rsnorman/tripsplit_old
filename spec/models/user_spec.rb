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
end
