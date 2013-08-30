class ExpenseContribution < ActiveRecord::Base
  belongs_to :user
  belongs_to :expense
  attr_accessible :amount, :user_id, :is_paid

	validates_uniqueness_of :user_id, :scope => :expense_id

	# Returns a percentage of the contribution of the total cost of the expense
  # @return [BigDecimal] percent of the expense
  def percentage
  	amount / expense.cost
  end

  before_save :pay_expense, :if => lambda{self.is_paid}
  after_save :destroy, :if => lambda{ (self.is_paid_was && !self.is_paid) || (self.amount_was && self.amount.zero?) }

  def pay_expense
    self.amount = self.expense.obligations.where(:user_id => self.user_id).first.amount rescue nil
    true
  end

  def serializable_hash(*args)
    args[0] ||= {}
    args[0][:include] = [:expense, :user]
    super
  end
end
