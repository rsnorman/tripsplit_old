require 'spec_helper'

describe User do
  before(:each) do
    @user = FactoryGirl.create(:user)
  end

  describe "total_trip_purchases_cost" do
    before(:each) do
      @trip = FactoryGirl.create(:trip)
      @trip.add_member(@user)
      @user.purchases << FactoryGirl.create(:expense, :cost => 10, :trip => @trip)
      @user.purchases << FactoryGirl.create(:expense, :cost => 30, :trip => @trip)
    end

    it "should total all costs of trip at $40" do
      @user.total_trip_purchases_cost(@trip).should eq 40
    end

    it "should not add expense from differnet trip" do
      @user.purchases << FactoryGirl.create(:expense, :cost => 100)
      @user.total_trip_purchases_cost(@trip).should eq 40
    end
  end

  describe "#total_purchases_cost" do
    before(:each) do
      @trip = FactoryGirl.create(:trip)
      @trip.add_member(@user)
      @user.purchases << FactoryGirl.create(:expense, :cost => 10, :trip => @trip)
      @user.purchases << FactoryGirl.create(:expense, :cost => 30, :trip => @trip)
      @user.purchases << FactoryGirl.create(:expense, :cost => 100)
    end

    it "should total all purchases from different trips to $140" do
    	@user.total_purchases_cost.should eq 140
    end
  end

  describe "#amount_owed_from" do
    before(:each) do
      @member = FactoryGirl.create(:user)
      @trip = FactoryGirl.create(:trip, :organizer => @user)
      @trip.add_member(@member)
      @expense = FactoryGirl.create(:expense, :purchaser => @user, :cost => 100, :trip => @trip)
      @trip.reload
    end

    it "should return $50 since user paid $100 for expense" do
      @user.amount_owed_from(@member).should eq 50
    end

    it "should return $25 since user paid $100 for expense and member paid $50 for another" do
      FactoryGirl.create(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      @user.amount_owed_from(@member).should eq 25
    end

    it "should return $25 since user paid $100 for expense and member contributed $25" do
      FactoryGirl.create(:contribution, :amount => 25, :user => @member, :expense => @expense)
      @user.amount_owed_from(@member).should eq 25
    end

    it "should return $50 since user paid $100 for expense and user contributed $25 to member's expense" do
      member_expense = FactoryGirl.create(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      FactoryGirl.create(:contribution, :amount => 25, :user => @user, :expense => member_expense)
      @user.amount_owed_from(@member).should eq 50
    end

    it "should return 0 if there are no expenses" do
      @expense.destroy
      @user.amount_owed_from(@member).should eq 0
    end

    it "should return 0 if the user owes the member money" do
      FactoryGirl.create(:expense, :purchaser => @member, :cost => 150, :trip => @trip)
      @user.amount_owed_from(@member).should eq 0
    end

    it "should not include expenses from other trips" do
      puts "TODO: need to write test to make sure expenses are not included from other trips"
    end
  end

  describe "#amount_due_to" do
    before(:each) do
      @member = FactoryGirl.create(:user)
      @trip = FactoryGirl.create(:trip, :organizer => @user)
      @trip.add_member(@member)
      @expense = FactoryGirl.create(:expense, :purchaser => @user, :cost => 100, :trip => @trip)
      @trip.reload
    end

    it "should return $50 since user paid $100 for expense" do
      @member.amount_due_to(@user).should eq 50
    end

    it "should return $25 since user paid $100 for expense and member paid $50 for another" do
      FactoryGirl.create(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      @member.amount_due_to(@user).should eq 25
    end

    it "should return $25 since user paid $100 for expense and member contributed $25" do
      FactoryGirl.create(:contribution, :amount => 25, :user => @member, :expense => @expense)
      @member.amount_due_to(@user).should eq 25
    end

    it "should return $50 since user paid $100 for expense and user contributed $25 to member's expense" do
      member_expense = FactoryGirl.create(:expense, :purchaser => @member, :cost => 50, :trip => @trip)
      FactoryGirl.create(:contribution, :amount => 25, :user => @user, :expense => member_expense)
      @member.amount_due_to(@user).should eq 50
    end

    it "should return 0 if there are no expenses" do
      @expense.destroy
      @member.amount_due_to(@user).should eq 0
    end

    it "should return 0 if the user owes the member money" do
      FactoryGirl.create(:expense, :purchaser => @member, :cost => 150, :trip => @trip)
      @member.amount_due_to(@user).should eq 0
    end

    it "should not include expenses from other trips" do
      puts "TODO: need to write test to make sure expenses are not included from other trips"
    end
  end

  describe "#connect_accounts" do
    before(:each) do
      @user2 = FactoryGirl.create(:user)
    end

    it "should delete the second account" do
      @user.connect(@user2)
      User.exists?(@user2.id).should eq false
    end

    it "should transfer all organized trips from second account to first account" do
      trip = FactoryGirl.create(:trip, :organizer => @user2)
      @user.connect(@user2)

      trip.reload
      trip.organizer.should eq @user
    end

    it "should transfer all expenses from second account to first account" do
      trip = FactoryGirl.create(:trip, :organizer => @user2)
      expense = FactoryGirl.create(:expense, :purchaser => @user2, :trip => trip)
      @user.connect(@user2)

      expense.reload
      expense.purchaser.should eq @user
    end

    it "should transfer all memberships from second account to first account" do
      trip = FactoryGirl.create(:trip, :organizer => FactoryGirl.create(:user))
      membership = trip.add_member(@user2)
      @user.connect(@user2)

      membership.reload
      membership.user.should eq @user
    end

    it "should transfer all contributions from second account to first account" do
      contribution = FactoryGirl.create(:contribution, :user => @user2)

      @user.connect(@user2)

      contribution.reload
      contribution.user.should eq @user
    end

    it "should transfer all contributions from second account to first account" do
      obligation = FactoryGirl.create(:obligation, :user => @user2)

      @user.connect(@user2)

      obligation.reload
      obligation.user.should eq @user
    end

    it "should transfer all friendships from second account to first account" do
      friendship = FactoryGirl.create(:friendship, :user => @user2)
      @user.connect(@user2)

      friendship.reload
      friendship.user.should eq @user
    end

    it "should transfer all friendships tied to second account from other users to first account" do
      friendship = FactoryGirl.create(:friendship, :friend => @user2)
      @user.connect(@user2)

      friendship.reload
      friendship.friend.should eq @user
    end

    it "should transfer over all facebook fields" do
      now = Time.now
      user3 = FactoryGirl.create(:user, :facebook_id => "1", :facebook_access_token_expires_at => now, :facebook_access_token => "12345")
      @user.connect(user3)
      @user.facebook_id.should eq "1"
      @user.facebook_access_token_expires_at.should eq now
      @user.facebook_access_token.should eq "12345"
    end

    it "should transfer over all twitter fields" do
      user3 = FactoryGirl.create(:user, :twitter_id => "1", :twitter_access_token => "9876", :twitter_access_secret => "12345")
      @user.connect(user3)
      @user.twitter_id.should eq "1"
      @user.twitter_access_token.should eq "9876"
      @user.twitter_access_secret.should eq "12345"
    end
  end

  describe '#owes_user' do
    let(:trip_member) { FactoryGirl.create(:user) }
    let(:trip) { FactoryGirl.create(:trip, organizer: @user) }

    before do
      trip.add_member(FactoryGirl.create(:user))
      trip.add_member(trip_member)
    end

    subject { @user }

    context 'with no purchases' do
      it 'returns 0' do
        expect(subject.owes_user(trip_member, trip)).to be_zero
      end
    end

    context 'with member with single purchase' do
      let!(:expense) do
        FactoryGirl.create(:expense, purchaser: trip_member,
                                     cost: 90,
                                     trip: trip)
      end

      it 'returns third of purchase amount' do
        expect(subject.owes_user(trip_member, trip)).to eq 30
      end
    end

    context 'with user with single purchase' do
      let!(:expense) do
        FactoryGirl.create(:expense, purchaser: subject,
                                     cost: 90,
                                     trip: trip)
      end

      it 'returns negative third of purchase amount' do
        expect(subject.owes_user(trip_member, trip)).to eq(-30)
      end
    end

    context 'with purchases from user and member' do
      let!(:expense) do
        FactoryGirl.create(:expense, purchaser: subject,
                                     cost: 30,
                                     trip: trip)
        FactoryGirl.create(:expense, purchaser: trip_member,
                                     cost: 90,
                                     trip: trip)
      end

      it 'returns amount owed minus amount due to user' do
        expect(subject.owes_user(trip_member, trip)).to eq(20)
      end
    end

    context 'with member with single purchase but user already paid back' do
      let(:expense) do
        FactoryGirl.create(:expense, purchaser: trip_member,
                                     cost: 90,
                                     trip: trip)
      end

      before do
        FactoryGirl.create(:contribution, amount: 30,
                                          user: subject,
                                          expense: expense)
      end

      it 'returns zero' do
        expect(subject.owes_user(trip_member, trip)).to be_zero
      end
    end

    context 'with user with single purchase but member already paid back' do
      let(:expense) do
        FactoryGirl.create(:expense, purchaser: subject,
                                     cost: 90,
                                     trip: trip)
      end

      before do
        FactoryGirl.create(:contribution, amount: 30,
                                          user: trip_member,
                                          expense: expense)
      end

      it 'returns zero' do
        expect(subject.owes_user(trip_member, trip)).to be_zero
      end
    end
  end
end
