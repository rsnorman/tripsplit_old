require 'spec_helper'

describe ExpenseContribution do
  describe "#percentage" do
  	before(:each) do
  		@purchaser = Factory(:user)
  		@trip = Factory(:trip, :organizer => @purchaser)
  		@expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
  		@contribution = Factory(:contribution, :user => @purchaser, :expense => @expense, :amount => 20)
  	end

  	it "should return a percentage of the contribution the user made to the expense" do
  		@contribution.percentage.should eq 0.2
  	end
  end

  describe "#pay_expense" do
    before(:each) do
      @purchaser = Factory(:user)
      @trip = Factory(:trip, :organizer => @purchaser)
      @user = Factory(:user)
      @trip.add_member(@user)
      @expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
      @contribution = Factory(:contribution, :user => @user, :expense => @expense, :is_paid => true)
    end

    it "should pay off the amount of the expense the user is obligated to pay" do
      @contribution.reload
      @contribution.amount.should eq 50
    end

    it "should updated to the obligation amount after the expense is changed" do
      @contribution.reload
      @contribution.amount.should eq 50

      @user.obligations.first.update_attributes(:amount => 25)

      @contribution.reload
      @contribution.amount.should eq 25
    end
  end
end
