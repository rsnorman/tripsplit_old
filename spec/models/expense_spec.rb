require 'spec_helper'

describe Expense do
  before(:each) do
    @purchaser = Factory(:user)
    @member = Factory(:user)
    @trip = Factory(:trip, :organizer => @purchaser)
    @trip.add_member(@member)
    @expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100)
  end

  describe "#create_obligations_for_trip_members" do
    it "should create obligations for both the purchaser and other trip member" do
      @expense.obligations.size.should eq 2
      @expense.obligations.collect(&:amount).should eq [50, 50]
      @expense.obligations.collect(&:user_id).should eq [@purchaser.id, @member.id]
    end

    it "should create obligations for the tip for both members" do
      expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 100, :tip => 20)
      expense.obligations.size.should eq 4
      expense.obligations.tips.size.should eq 2

      expense.obligations.collect(&:amount).should eq [50, 10, 50, 10]
    end
  end

  describe "#add_tip_obligations" do
    it "should add tip obligations if tip was added after expense was created" do
      @expense.update_attributes(:tip => 20)
      @expense.obligations.size.should eq 4
      @expense.obligations.tips.size.should eq 2
      @expense.obligations.tips.collect(&:amount).should eq [10, 10]
    end

    it "shouldn't add any more tip obligations if tip is updated to a different value other than zero" do
      @expense.update_attributes(:tip => 20)
      @expense.obligations.size.should eq 4
      @expense.obligations.tips.size.should eq 2
      @expense.obligations.tips.collect(&:amount).should eq [10, 10]
    end
  end

  describe "#reaverages_tip_obligations" do
    it "should reaverage the tip obligations after tip is increased" do
      @expense.update_attributes(:tip => 20)
      @expense.update_attributes(:tip => 40)
      @expense.obligations.tips.collect(&:amount).should eq [20, 20]
    end

    it "should reaverage the tip obligations after tip is decreased" do
      @expense.update_attributes(:tip => 20)
      @expense.update_attributes(:tip => 10)
      @expense.obligations.tips.collect(&:amount).should eq [5, 5]
    end
  end

  describe "#remove_tip_obligations" do
    it "should remove the tip obligations if tip is set to zero" do
      @expense.update_attributes(:tip => 20)
      @expense.obligations.tips.size.should eq 2
      @expense.update_attributes(:tip => 0)
      @expense.obligations.tips.size.should eq 0
    end
  end

  describe "#cost_for" do
    it "should return the obligation as the average cost" do
      @expense.cost_for(@member).should eq 50
    end

    it "should return the obligation instead of the average cost if user added obligation" do
      @expense.obligations.detect{|x| x.user_id == @member.id}.update_attributes(:amount => 20)
      @expense.cost_for(@member).should eq 20
    end

    it "should return the average of the cost and tip" do
      expense = Factory(:expense, :purchaser => @purchaser, :trip => @trip, :cost => 80, :tip => 20)
      expense.cost_for(@member).should eq 50
    end
  end

  describe "#reaverage_obligations" do
    it "should update the averaged obligations when expense amount is increased" do
      @expense.update_attributes(:cost => 200)
      @expense.obligations.collect(&:amount).should eq [100, 100]
    end

    it "should update the averaged obligations when expense amount is decreased" do
      @expense.update_attributes(:cost => 50)
      @expense.obligations.collect(&:amount).should eq [25, 25]
    end

    it "should update only the averaged obligations and not ones that have been customized" do
      @expense.obligations.first.update_attributes(:amount => 20)
      @expense.update_attributes(:cost => 200)
      @expense.obligations.collect(&:amount).should eq [20, 180]
    end

    it "should update only the editable obligations and push full cost on to them" do
      obligation = @expense.obligations.first
      obligation.is_tip = true
      obligation.save

      @expense.update_attributes(:cost => 200)
      @expense.obligations.collect(&:amount).should eq [50, 200]
    end
  end

  describe "#contribution_from" do
    it "should remove money from the average cost of an expense for user that has contributed" do
      @contribution = Factory(:contribution, :user => @member, :expense => @expense, :amount => 20)
      @expense.contribution_from(@member).should eq 20
    end

    it "should return the entire cost of the expense if member is purchaser" do
      @expense.contribution_from(@purchaser).should eq 100
    end

    it "should return the entire cost of the expense minus contributions made for the purchaser" do
      @contribution = Factory(:contribution, :user => @member, :expense => @expense, :amount => 20)
      @expense.contribution_from(@purchaser).should eq 80
    end
  end

  describe "#average_cost" do
    it "should return the average cost of an expense with two members" do
      @user1 = Factory(:user)
      @user2 = Factory(:user)
      @trip = Factory(:trip, :organizer => @user1)
      @trip.add_member(@user2)
      @expense = Factory(:expense, :purchaser => @user1, :trip => @trip, :cost => 100)

      @expense.average_cost.should eq 50
    end
  end

  describe "#cost_for_purchaser" do
    it "should return the total cost of the expense if no one has pitched in" do
      @expense.cost_for_purchaser.should eq 100
    end

    it "should return the total cost of the expense minus contributions for the purchaser" do
      Factory(:contribution, :user => @member, :expense => @expense, :amount => 10)
      @expense.cost_for_purchaser.should eq 90
    end
  end
end
