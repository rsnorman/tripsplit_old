class Expense < ActiveRecord::Base
  attr_accessor :full_detail, :with_purchaser, :loanee_id

  belongs_to :purchaser, :class_name => User
  belongs_to :trip

  has_many :contributions, :class_name => ExpenseContribution, :dependent => :destroy
  has_many :obligations, :class_name => ExpenseObligation, :dependent => :destroy

  after_create :create_loan, :if => lambda{ self.loanee_id }
  after_create :create_obligations_for_trip_members, :unless => lambda{ self.loanee_id }
  after_update :reaverage_obligations, :if => lambda{ self.cost_was != self.cost }
  after_update :add_tip_obligations, :if => lambda{ self.tip_was.zero? && !self.tip.zero? }
  after_update :reaverage_tip_obligations, :if => lambda{ self.tip_was != self.tip && !self.tip.zero? }
  after_update :remove_tip_obligations, :if => lambda{ !self.tip_was.zero? && self.tip.zero?}

  accepts_nested_attributes_for :obligations, :contributions

  # Creates an expense that acts like a loan
  def create_loan
    self.update_column(:is_loan, true)
    self.update_column(:name, self.name || 'Loan')
    trip.members.find(self.loanee_id).add_obligation(self, "Loan Obligation", self.read_attribute(:cost))
  end

  # Creates obligations for each trip member so that expense and tip is evenly divided
  def create_obligations_for_trip_members
    trip.members.each do |member|
      member.add_obligation(self, "Expense Obligation", self.read_attribute(:cost) / trip.members.size)
      member.add_obligation(self, "Tip Obligation", self.tip / trip.members.size, false) unless self.tip.nil? || self.tip.zero?
    end

    true
  end

  # Reaverages the obligations to make sure the full cost is covered of the expense
  def reaverage_obligations
    total_custom_amount = obligations.custom.editable.sum(:amount)
    averaged_obligations = obligations.averaged.editable
    averaged_amount = (read_attribute(:cost) - total_custom_amount) / averaged_obligations.size
    averaged_obligations.each do |obligation|
      obligation.update_column(:amount, averaged_amount)
    end

    true
  end

  # Adds tip obligations if tip was added to expense
  def add_tip_obligations
    trip.members.each do |member|
      member.add_obligation(self, "Tip Obligation", self.tip / trip.members.size, false)
    end
  end

  # Reaverages the tip obligations
  def reaverage_tip_obligations
    obligations.tips.each do |obligation|
      obligation.update_attributes(:amount => self.tip / obligations.tips.size)
    end
  end

  # Removes tip obligations if tip was removed from expense
  def remove_tip_obligations
    obligations.tips.destroy_all
  end

  # Gets the cost for a member, factoring in obligations
  # @param [User] member that cost is being calculated for
  # @return [BigDecimal] cost for the member
  def cost_for(member)
    obligations.select{|x| x.user_id == member.id}.map(&:amount).inject(0, :+)
  end

  # Returns the cost for the purchaser, factoring in contributions
  # @return [BigDecimal] cost for purchaser of expense
  def cost_for_purchaser
    cost - contributions.sum(:amount)
  end

  # Gets the contribution from a member, factoring in contributions
  # @param [User] member that contribution is being calculated for
  # @return [BigDecimal] cost for the member
  def contribution_from(member)
    return cost_for_purchaser if member.id == purchaser_id
    contribution = contributions.detect{|x| x.user_id == member.id}
    contribution ? contribution.amount : 0.0
  end

  # Gets the average cost of expense for all trip members
  # @return [BigDecimal] average cost of expense
  def average_cost
    cost / trip.members.size
  end

  # Gets the average cost of expense for all trip members
  # @return [BigDecimal] average cost of expense
  def average_tip
    tip / trip.members.size
  end

  # Gets the average cost of expense for all trip members
  # @return [BigDecimal] average cost of expense
  def average_cost_without_tip
    cost(false) / trip.members.size
  end

  # Gets the cost of the expense with or without the tip
  # @param [Boolean] with_tip
  # @return [BidDecimal] cost of the expense with or without the tip
  def cost(with_tip = true)
    self.read_attribute(:cost) + (with_tip ? self.read_attribute(:tip) : 0)
  end

  def serializable_hash(*args)
    if self.full_detail
      args[0] ||= {}
      args[0][:methods] = [:average_cost, :average_tip, :average_tip_without_cost]
      args[0][:include] = [:contributions, :obligations, :purchaser]
    end

    if self.with_purchaser
      args[0] ||= {}
      args[0][:include] = [:purchaser]
    end

    _hash = super

    if self.is_loan
      _hash[:loanee] = self.obligations.first.user
    end

    _hash
  end
end
