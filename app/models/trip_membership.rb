class TripMembership < ActiveRecord::Base
  attr_accessible :trip, :user, :trip_id, :user_id
  belongs_to :trip
  belongs_to :user

  validates_uniqueness_of :user_id, :scope => :trip_id

  after_create :add_obligations

  def add_obligations
  	self.trip.expenses.each do |e|
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
end
