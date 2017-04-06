require 'spec_helper'

describe ExpenseContribution do
  describe "#percentage" do
  	before(:each) do
  		@purchaser = FactoryGirl.create(:user)
  		@trip = FactoryGirl.create(:trip, :organizer => @purchaser)
  		@expense = FactoryGirl.create(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
  		@contribution = FactoryGirl.create(:contribution, :user => @purchaser, :expense => @expense, :amount => 20)
  	end

  	it "should return a percentage of the contribution the user made to the expense" do
  		@contribution.percentage.should eq 0.2
  	end
  end

  describe "#pay_expense" do
    before(:each) do
      @purchaser = FactoryGirl.create(:user)
      @trip = FactoryGirl.create(:trip, :organizer => @purchaser)
      @user = FactoryGirl.create(:user)
      @trip.add_member(@user)
      @expense = FactoryGirl.create(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
      @contribution = FactoryGirl.create(:contribution, :user => @user, :expense => @expense, :is_paid => true)
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

  describe "#remove_after_marked_unpaid" do
    before(:each) do
      @purchaser = FactoryGirl.create(:user)
      @trip = FactoryGirl.create(:trip, :organizer => @purchaser)
      @user = FactoryGirl.create(:user)
      @trip.add_member(@user)
      @expense = FactoryGirl.create(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
      @contribution = FactoryGirl.create(:contribution, :user => @user, :expense => @expense, :is_paid => true)
    end

    it "should destroy the contribution after the is_paid is marked false" do
      @contribution.update_attributes(:is_paid => false)
      ExpenseContribution.exists?(@contribution.id).should eq false
    end

    it "should destroy the contribution after the amount is set to 0" do
      contribution = FactoryGirl.create(:contribution, :user => FactoryGirl.create(:user), :expense => @expense, :amount => 50, :is_paid => false)
      ExpenseContribution.exists?(contribution.id).should eq true
      contribution.update_attributes(:amount => 0)
      ExpenseContribution.exists?(contribution.id).should eq false
    end
  end
end
