class ObligationsMeetCost < ActiveModel::Validator
  def validate(obligation)
    if obligation.expense.obligations.editable.averaged.size == 1
      obligation.errors[:amount] << "Obligation cannot change amount since expense cost will not be covered or will be exceeded"
    end
  end
end

class ExpenseObligation < ActiveRecord::Base
  belongs_to :user
  belongs_to :expense
  attr_accessible :amount, :name, :user_id, :is_average

  validates_with ObligationsMeetCost, :if => lambda { !self.id.nil? && self.amount != self.amount_was && self.is_average }
  validates_presence_of :amount, :user_id
  validates_uniqueness_of :user_id, :scope => [:expense_id, :is_tip]

  scope :averaged, where(:is_average => true)
  scope :custom, where(:is_average => false)
  scope :editable, where(:is_tip => false)
  scope :tips, where(:is_tip => true)

  before_update :set_as_not_average
  after_update :adjust_other_expense_obligations, :if => lambda{ self.amount_was != self.amount }
  after_create :adjust_other_expense_obligations
  after_destroy :remove_tip, :if => lambda { self.user.obligations.editable.where(:expense_id => self.expense_id).empty? }
  after_save :pay_off_obligation, :if => lambda{ self.amount_was != self.amount }
  after_update :reaverage, :if => lambda { self.is_average_was == false && self.is_average }

  def reaverage
    expense.reaverage_obligations
  end

  # Sets the obligation as customized if the amount has been changed
  def set_as_not_average
    self.is_average = false if self.amount != self.amount_was
    true
  end

  # Adjusts uncustomized obligations to still meet full cost of expense after obligation is customized
  def adjust_other_expense_obligations
    expense.reaverage_obligations
  end

  # Returns a percentage of the obligation of the total cost of the expense
  # @return [BigDecimal] percent of the expense
  def percentage
    amount / expense.cost
  end

  # Removes a tip obligation if the main portion obligation has been removed
  def remove_tip
    self.user.obligations.tips.where(:expense_id => self.expense_id).each{|x| x.destroy}
  end

  def update_column(*args)
    super

    pay_off_obligation if args[0].to_sym == :amount
  end

  def pay_off_obligation
    contribution = self.user.contributions.where(:expense_id => self.expense_id).first
    if contribution && contribution.is_paid
      contribution.pay_expense
      contribution.save
    end
  end

  def serializable_hash(*args)
    args[0] ||= {}
    args[0][:include] = [:expense, :user]
    super
  end
end