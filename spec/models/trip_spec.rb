require 'spec_helper'

describe Trip do
  before(:each) do
    @organizer = Factory(:user)
    @trip = Factory(:trip, :organizer => @organizer)
  end

  # describe "#organizer" do
  #   it "should have organizer as the user who created the trip" do
  #     @trip.organizer.should eq @organizer
  #   end
  # end

  # describe "#adds_organizer_as_member" do
  #   it "should add the organizer as a member of the trip after it is created" do
  #     @trip.members.first.should eq @organizer
  #   end
  # end

  # describe "#add_member" do
  #   it "should add a user to a trip as a trip member" do
  #     user = Factory(:user)
  #     @trip.add_member(user)
  #     @trip.members.last.should eq user
  #   end
  # end

  # describe "#total_cost" do
  #   it "should add up the total cost of two expenses and equal the sum of their costs" do
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 10))
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 30))

  #     @trip.total_cost.should eq 40
  #   end

  #   it "should add up the total cost of two expenses (one with a tip) and equal the sum of their costs" do
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 10))
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 30, :tip => 5))

  #     @trip.total_cost.should eq 45
  #   end
  # end

  # describe "#average_cost" do
  #   it "should average the cost of the trip for two members" do
  #     user = Factory(:user)
  #     @trip.add_member(user)
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 10))
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 30))

  #     @trip.average_cost_per_member.should eq 20.0
  #   end

  #   it "should average the cost of the trip for two members with a tip on one of the expenses" do
  #     user = Factory(:user)
  #     @trip.add_member(user)
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 10, :tip => 10))
  #     @trip.expenses.create(Factory.attributes_for(:expense, :cost => 30))

  #     @trip.average_cost_per_member.should eq 25.0
  #   end
  # end

  describe "#total_obligated_from" do
    before(:each) do
      @expense = Factory(:expense, :cost => 30, :purchaser => @organizer, :trip => @trip)
      @trip.reload
    end

    it "should return the full price of the expense" do
      @trip.total_obligated_from(@organizer).should eq 30
    end

    it "should return the half the price of the expense split between the other member" do
      user = Factory(:user)
      @trip.add_member(user)
      @trip.reload

      @trip.total_obligated_from(@organizer).should eq 15
      @trip.total_obligated_from(user).should eq 15
    end

    it "should return the half the price of the first expense and half the price of the second expense purchased by the other user" do
      user = Factory(:user)
      @trip.add_member(user)
      expense1 = Factory(:expense, :cost => 10, :purchaser => user, :trip => @trip)
      @trip.reload

      @trip.total_obligated_from(@organizer).should eq 20
      @trip.total_obligated_from(user).should eq 20
    end

    it "should return 23 since the other user is only obligated for 7 of the first expense" do
      user = Factory(:user)
      @trip.add_member(user)
      user.obligations.first.update_attributes(:amount => 7)
      @trip.reload

      @trip.total_obligated_from(@organizer).should eq 23
      @trip.total_obligated_from(user).should eq 7
    end

    it "should return 30 since the other user is only obligated for none of the first expense" do
      user = Factory(:user)
      @trip.add_member(user)
      user.obligations.first.update_attributes(:amount => 0)
      @trip.reload

      @trip.total_obligated_from(@organizer).should eq 30
      @trip.total_obligated_from(user).should eq 0
    end

    it "should return 28 since the other user is only obligated for 7 of the first expense and bought an expense worth 10" do
      user = Factory(:user)
      @trip.add_member(user)
      user.obligations.first.update_attributes(:amount => 7)
      expense1 = Factory(:expense, :cost => 10, :purchaser => user, :trip => @trip)
      @trip.reload

      @trip.total_obligated_from(@organizer).should eq 28
      @trip.total_obligated_from(user).should eq 12
    end
  end

  describe "#total_contributed_from" do
    before(:each) do
      @user = Factory(:user)
      @trip.add_member(@user)
      @expense = Factory(:expense, :cost => 30, :purchaser => @organizer, :trip => @trip)
      @trip.reload
    end

    it "should return the full price of the expense" do
      @trip.total_contributed_from(@organizer).should eq 30
      @trip.total_contributed_from(@user).should eq 0
    end

    it "should return the full price of the first expense" do
      expense = Factory(:expense, :cost => 10, :purchaser => @user, :trip => @trip)
      @trip.reload

      @trip.total_contributed_from(@organizer).should eq 30
      @trip.total_contributed_from(@user).should eq 10
    end

    it "should return the full price minus the contribution from the other team member of the first expense" do
      @expense.contributions << Factory(:contribution, :user => @user, :amount => 10, :expense => nil)
      @trip.reload
      @trip.total_contributed_from(@organizer).should eq 20
      @trip.total_contributed_from(@user).should eq 10
    end

    it "should return the amount of the contribution from the other team member of the first expense" do
      @expense.contributions << Factory(:contribution, :user => @user, :amount => 30, :expense => nil)
      @trip.reload
      @trip.total_contributed_from(@organizer).should eq 0
      @trip.total_contributed_from(@user).should eq 30
    end
  end

  describe "#total_due_to" do
    before(:each) do
      @user = Factory(:user)
      @trip.add_member(@user)

      @expense1 = Factory(:expense, :cost => 10, :purchaser => @user, :trip => @trip)
      @expense2 = Factory(:expense, :cost => 30, :purchaser => @organizer, :trip => @trip)
      @trip.reload
    end

    it "should calculate that the organizer is owed $10 with two items purchased and the organizer spending $20 more" do
      @trip.total_due_to(@organizer).should eq 10
    end

    it "should calculate that the organizer is owed $50 with three items purchased and the organizer spending $100 more" do
      expense3 = Factory(:expense, :cost => 80, :purchaser => @organizer, :trip => @trip)
      @trip.reload
      @trip.total_due_to(@organizer).to_f.should eq 50
    end

    it "should calculate that the organizer is owed $10 with three items purchased and a third member of the trip" do
      user2 = Factory(:user)
      @trip.add_member(user2)

      Factory(:expense, :cost => 20, :purchaser => user2, :trip => @trip)
      @trip.reload

      @trip.total_due_to(@organizer).should eq 10
    end

    it "should calculate that the third member of the team is owed 0 after pitching in 20 bucks in expensese" do
      user2 = Factory(:user)
      @trip.add_member(user2)
      @trip.expenses << Factory(:expense, :cost => 20, :purchaser => user2)

      @trip.total_due_to(user2).should eq 0
    end

    it "should caclulate that the second member of the team that has only pitched in 10 bucks is owed -$10" do
      @trip.total_due_to(@user).should eq 0
    end

    it "should calculate that the user owes less since they only contributed $10 to the first purchase" do
      Factory(:contribution, :amount => 10, :user => @user, :expense => @expense1)
      @trip.reload
      @trip.total_due_to(@organizer).to_f.should eq 10
    end

    it "should calculate that the amount owed to the organizer is lower since other user was obligated for less" do
      @user.obligations.last.update_attributes(:amount => 10)
      @trip.reload
      @trip.total_due_to(@organizer).to_f.should eq 5
    end
  end

  # describe "#amount_owed_from" do
  #   before(:each) do
  #     @user = Factory(:user)
  #     @trip.add_member(@user)
  #     @trip.expenses << Factory(:expense, :cost => 10, :purchaser => @user)
  #     @trip.expenses << Factory(:expense, :cost => 30, :purchaser => @organizer)
  #   end

  #   it "should calculate that the organizer is owed $10 with two items purchased and the organizer spending $20 more" do
  #     @trip.amount_owed_from(@user).should eq 10
  #   end

  #   it "should calculate that the organizer is owed $50 with three items purchased and the organizer spending $100 more" do
  #     @trip.expenses << Factory(:expense, :cost => 80, :purchaser => @organizer)
  #     @trip.amount_owed_from(@user).should eq 50
  #   end

  #   it "should calculate that the organizer is owed $10 with three items purchased and a third member of the trip" do
  #     user2 = Factory(:user)
  #     @trip.add_member(user2)
  #     @trip.expenses << Factory(:expense, :cost => 20, :purchaser => user2)

  #     @trip.amount_owed_from(@user).should eq 10
  #   end

  #   it "should calculate that the third member of the team is owed 0 after pitching in 20 bucks in expensese" do
  #     user2 = Factory(:user)
  #     @trip.add_member(user2)
  #     @trip.expenses << Factory(:expense, :cost => 20, :purchaser => user2)

  #     @trip.amount_owed_from(user2).should eq 0
  #   end

  #   it "should caclulate that the second member of the team that has only pitched in 10 bucks is owed -$10" do
  #     @trip.amount_owed_from(@organizer).should eq -10
  #   end
  # end

  # describe "#outstanding_creditors" do
  #   before(:each) do
  #     @user = Factory(:user)
  #     @trip.add_member(@user)
  #     @trip.expenses << Factory(:expense, :cost => 10, :purchaser => @user)
  #     @trip.expenses << Factory(:expense, :cost => 30, :purchaser => @organizer)
  #   end

  #   it "should contain a list of the members that are owed money and how much they are owed" do
  #     @trip.outstanding_creditors.first[:member].should eq @organizer
  #     @trip.outstanding_creditors.first[:credit].should eq 10
  #   end

  #   it "should not contain any members that owe money" do
  #     @trip.outstanding_creditors.collect{|x| x[:member]}.should_not include @user
  #   end
  # end

  # describe "#outstanding_debtors" do
  #   before(:each) do
  #     @user = Factory(:user)
  #     @trip.add_member(@user)
  #     @trip.expenses << Factory(:expense, :cost => 10, :purchaser => @user)
  #     @trip.expenses << Factory(:expense, :cost => 30, :purchaser => @organizer)
  #   end

  #   it "should contain a list of the members that are owed money and how much they are owed" do
  #     @trip.outstanding_debtors.first[:member].should eq @user
  #     @trip.outstanding_debtors.first[:debt].should eq 10
  #   end

  #   it "should not contain any members that owe money" do
  #     @trip.outstanding_debtors.collect{|x| x[:member]}.should_not include @organizer
  #   end
  # end

  # describe "#serializable_hash" do
  #   before(:each) do
  #     @user = Factory(:user)
  #     @trip.add_member(@user)
  #     @trip.expenses << Factory(:expense, :cost => 10, :purchaser => @user)
  #     @trip.expenses << Factory(:expense, :cost => 30, :purchaser => @organizer)
  #   end

  #   it "should include total cost of the trip" do
  #     @trip.serializable_hash.keys.should include :total_cost
  #   end

  #   it "should include average cost per member of the trip" do
  #     @trip.serializable_hash.keys.should include :average_cost_per_member
  #   end
  # end
end
