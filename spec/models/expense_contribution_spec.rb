require 'spec_helper'

describe ExpenseContribution do
  describe "#percentage" do
  	before(:each) do
  		@purchaser = Factory(:user)
  		@trip = Factory(:trip, :organizer => @user)
  		@expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
  		@contribution = Factory(:contribution, :user => @purchaser, :expense => @expense, :amount => 20)
  	end

  	it "should return a percentage of the contribution the user made to the expense" do
  		@contribution.percentage.should eq 0.2
  	end
  end
end
