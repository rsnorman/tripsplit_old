class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable
          # :recoverable, :rememberable, :trackable, :validatable,
          # :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  attr_accessor :current_trip

  has_many :organized_trips, :class_name => Trip, :foreign_key => :organizer_id, :dependent => :destroy
  has_many :purchases, :class_name => Expense, :foreign_key => :purchaser_id, :dependent => :destroy
  has_many :memberships, :class_name => TripMembership, :dependent => :destroy
  has_many :trips, :through => :memberships
  has_many :expenses, :through => :trips
  has_many :contributions, :class_name => ExpenseContribution, :dependent => :destroy
  has_many :obligations, :class_name => ExpenseObligation, :dependent => :destroy
  has_many :friendships, :dependent => :destroy
  has_many :friends, :through => :friendships

  # Connects two accounts that are the same person but were created using different social medial log ins
  # @param [User] user with second account
  def connect(user)
    user.purchases.each do |purchase|
      purchase.purchaser_id = self.id
      purchase.save
    end

    user.contributions.each do |contribution|
      contribution.user_id = self.id
      contribution.save
    end

    user.obligations.each do |obligation|
      obligation.user_id = self.id
      obligation.save
    end

    user.friendships.each do |friendship|
      friendship.user_id = self.id
      friendship.save
    end

    Friendship.where(friend: user).each do |friendship|
      friendship.friend_id = self.id
      friendship.save
    end

    user.memberships.each do |membership|
      membership.user_id = self.id
      membership.save
    end

    user.organized_trips.each do |trip|
      trip.organizer_id = self.id
      trip.save
    end

    self.facebook_id ||= user.facebook_id
    self.facebook_access_token ||= user.facebook_access_token
    self.facebook_access_token_expires_at ||= user.facebook_access_token_expires_at

    self.twitter_id ||= user.twitter_id
    self.twitter_access_token ||= user.twitter_access_token
    self.twitter_access_secret ||= user.twitter_access_secret

    self.save

    User.destroy(user.id)
  end

  # Calculates the total cost of the expenses paid for by user of all the trips taken
  # return [BigDecimal] total cost of expenses
  def total_purchases_cost
    purchases.to_a.sum(&:cost)
  end

  # Calculates the total cost of the expenses paid for by the user for a single trip
  # retun [BigDecimal] total cost of expenses for trip
  def total_trip_purchases_cost(trip)
    purchases.select{|x| x.trip_id == trip.id}.sum(&:cost)
  end

  # Returns the key assigned to the user
  # @return [String, Int] key of the user
  def key
    self.id
  end

  # Adds an expense to the trip from the user
  # @param [Trip] trip that expense is being added to
  # @param [Hash] attributes for purchase/expense
  # @todo Write tests for this method
  def purchase(trip, attributes = {})
    e = Expense.new(attributes)
    e.purchaser = self
    e.trip = trip
    e.save
    e
  end

  # Adds an obligation for a user for an expense
  # @param [Expense] expense that user has an obligation to pay
  # @param [BigDecimal] amount the user is obligated to the bill
  def add_obligation(expense, name, amount, is_editable = true, is_average = true)
    return unless expense.obligations.where(:user_id => self.id, :is_tip => !is_editable).empty?

    obligation = ExpenseObligation.new(:name => name, :amount => amount)
    obligation.user = self
    obligation.expense = expense
    obligation.is_tip = !is_editable
    obligation.is_average = is_average
    obligation.save!
    obligation
  end

  # Adds a contribution for a user for an expense
  # @param [Expense] expense that user has an obligation to pay
  # @param [BigDecimal] amount the user is contributing to the bill
  def add_contribution(expense, amount)
    contribution = ExpenseContribution.new(:amount => amount)
    contribution.user = self
    contribution.expense = expense
    contribution.save!
    contribution
  end

  # Returns the amount owed from a member on a trip to the user
  # @param [User] member that owes money
  # @return [BigDecimal] amount the user is owed from trip member
  def amount_owed_from(member, trip = nil)
    purchases_ids = trip ? self.purchases.where(:trip_id => trip.id).collect(&:id) : self.purchases.collect(&:id)
    member_purchases_ids = trip ? member.purchases.where(:trip_id => trip.id).collect(&:id) : member.purchases.collect(&:id)
    [(member.obligations.where(:expense_id => purchases_ids).sum(:amount) - member.contributions.where(:expense_id => purchases_ids).sum(:amount)) - (self.obligations.where(:expense_id => member_purchases_ids).sum(:amount) - self.contributions.where(:expense_id => member_purchases_ids).sum(:amount)), 0].max
  end

  # Returns the amount due to a member on a trip from the user
  # @param [User] member that is due money
  # @return [BigDecimal] amount the member is due from user
  def amount_due_to(member, trip = nil)
    purchases_ids = trip ? self.purchases.where(:trip_id => trip.id).collect(&:id) : self.purchases.collect(&:id)
    member_purchases_ids = trip ? member.purchases.where(:trip_id => trip.id).collect(&:id) : member.purchases.collect(&:id)
    [(self.obligations.where(:expense_id => member_purchases_ids).sum(:amount) - self.contributions.where(:expense_id => member_purchases_ids).sum(:amount)) - (member.obligations.where(:expense_id => purchases_ids).sum(:amount) - member.contributions.where(:expense_id => purchases_ids).sum(:amount)), 0].max
  end

  # Override so that password is not sent in JSON, XML, etc
  def serializable_hash(*args)
    args[0] = (args[0] || {}).merge(:except => [:password, :twitter_access_token, :twitter_access_secret, :facebook_access_token] )
    user_hash = super

    if self.current_trip
      user_hash[:due] = self.current_trip.total_due_to(self)
      user_hash[:owe] = self.current_trip.total_owed_from(self)
      user_hash[:contributed] = self.current_trip.total_contributed_from(self)
      user_hash[:obligated] = self.current_trip.total_obligated_from(self)
      user_hash[:purchases] = self.purchases.where(:trip_id => self.current_trip.id)
      user_hash[:contributions] = self.contributions.includes(:expense).where(["expenses.trip_id = ?", self.current_trip.id])
      user_hash[:obligations] = self.obligations.includes(:expense).where(["expenses.trip_id = ?", self.current_trip.id])

      user_hash[:owe_members] = self.current_trip.members.collect{|x| {:user => x, :amount => self.amount_owed_from(x, self.current_trip)}}.select{|x| !x[:amount].zero?}
      user_hash[:due_members] = self.current_trip.members.collect{|x| {:user => x, :amount => self.amount_due_to(x, self.current_trip)}}.select{|x| !x[:amount].zero?}
    end

    user_hash
  end
end
