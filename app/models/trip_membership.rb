class TripMembership < ActiveRecord::Base
  attr_accessible :trip, :user, :trip_id, :user_id
  belongs_to :trip
  belongs_to :user

  validates_uniqueness_of :user_id, :scope => :trip_id

  after_create :add_obligations

  # TO DO: Write a test to make sure loan expenses don't have obligations added
  def add_obligations
  	self.trip.expenses.where(:is_loan => false).each do |e|
  		user.add_obligation(e, "Expense Obligation", e.cost / self.trip.members.size)
      user.add_obligation(e, "Tip Obligation", e.tip / self.trip.members.size, false) unless e.tip.nil? || e.tip.zero?
      e.reaverage_obligations
  	end
  end

  after_destroy :remove_obligations

  def remove_obligations
    user.obligations.where(:expense_id => self.trip.expenses.collect(&:id)).destroy_all
    self.trip.expenses.each do |e|
      e.reaverage_obligations
    end
  end

  after_create :add_friends

  def add_friends
    self.trip.members.where(["user_id != ?", self.user_id]).each do |member|
      member.friendships << Friendship.new(:friend_id => self.user_id)
      self.user.friendships << Friendship.new(:friend_id => member.id)
    end
  end

  before_destroy :destroy_facebook_invite, :if => lambda { self.user.facebook_id && self.trip.facebook_event_id }

  def destroy_facebook_invite
    Koala::Facebook::API.new(self.trip.organizer.facebook_access_token).delete_connections(self.trip.facebook_event_id, "invited/#{self.user.facebook_id}")
  end
end
