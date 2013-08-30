require 'spec_helper'

describe ExpenseObligation do

  describe "#percentage" do
  	before(:each) do
  		@purchaser = Factory(:user)
  		@trip = Factory(:trip, :organizer => @user)
  		@expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
      @obligation = Factory(:obligation, :amount => 20, :expense => @expense)
  	end

  	it "should return a percentage of the obligation the user made to the expense" do
  		@obligation.percentage.should eq 0.2
  	end
  end

  describe "#set_as_not_average" do
    before(:each) do
      @obligation = Factory(:obligation, :amount => 10)
    end

    it "should set has_been_customized to true after amount is updated" do
      @obligation.update_attributes(:amount => 20)
      @obligation.is_average.should be_false
    end

    it "should not set has_been_customized to true if amount was not changed" do
      @obligation.user_id = 5
      @obligation.save
      @obligation.is_average.should be_true
    end
  end

  describe "#destroy_tip" do
    before(:each) do
      @purchaser = Factory(:user)
      @member = Factory(:user)
      @trip = Factory(:trip, :organizer => @purchaser)
      @trip.add_member(@member)
      Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 80, :tip => 20)
    end

    it "should remove the tip obligation if the member deletes the portion obligation" do
      @member.obligations.first.destroy
      @member.obligations.reload
      @member.obligations.tips.should be_empty
    end
  end

  describe "#adjust_other_expense_obligations" do
    before(:each) do
      @trip = Factory(:trip)
      3.times do
        @trip.add_member(Factory(:user))
      end

      @expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
    end

    it "should update the obligations that are not customized to spread out the cost when obligation is set higher" do
      @expense.obligations.first.update_attributes(:amount => 40)
      @expense.reload.obligations.collect(&:amount).should eq [40, 20, 20, 20]
    end

    it "should update the obligations that are not customized to spread out the cost when obligation is set lower" do
      @expense.obligations.first.update_attributes(:amount => 10)
      @expense.obligations.collect(&:amount).should eq [10, 30, 30, 30]
    end

    it "should update the obligations that are not customized to spread out the cost when obligation is set to full cost" do
      @expense.obligations.first.update_attributes(:amount => 100)
      @expense.obligations.collect(&:amount).should eq [100, 0, 0, 0]
    end

    it "should update the obligations that are not customized to spread out the cost when obligation is set to 0" do
      @expense.obligations.first.update_attributes(:amount => 0)
      @expense.obligations.collect{|x| x.amount.to_f.round(2)}.should eq [0.0, (100.0/3.0).round(2), (100.0/3.0).round(2).round(2), (100.0/3.0).round(2)]
    end

    it "should update the obligations that are not customizes to spread out cost when more than one is customized" do
      @expense.obligations.first.update_attributes(:amount => 40)
      @expense.obligations.last.update_attributes(:amount => 40)
      @expense.obligations.collect(&:amount).should eq [40, 10, 10, 40]
    end

    it "should update the obligations that are not customizes to spread out cost when the same one is customized twice" do
      @expense.obligations.first.update_attributes(:amount => 40)
      @expense.obligations.first.update_attributes(:amount => 34)
      @expense.obligations.collect(&:amount).should eq [34, 22, 22, 22]
    end

    it "should update the obligations that are not customized after a new obligation is added" do
      Factory(:user).add_obligation(@expense, "Fries", 20, true, false)
      @expense.obligations.collect(&:amount).should eq [20, 20, 20, 20, 20]
    end

    it "should update the obligations that are not customized after a new obligation is added" do
      Factory(:user).add_obligation(@expense, "Fries", 20, true, false)
      @expense.obligations.collect(&:amount).should eq [20, 20, 20, 20, 20]
    end
  end

    describe "#reaverage" do
    before(:each) do
      @trip = Factory(:trip)
      3.times do
        @trip.add_member(Factory(:user))
      end

      @expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
    end

    it "should reaverage the updated obligation after is_average is set back to true" do
      @expense.obligations.first.update_attributes(:amount => 40)
      @expense.reload.obligations.collect(&:amount).should eq [40, 20, 20, 20]
      @expense.obligations.first.update_attributes(:is_average => true)
      @expense.reload.obligations.collect(&:amount).should eq [25, 25, 25, 25]
    end
  end
end
