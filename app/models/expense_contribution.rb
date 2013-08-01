class ExpenseContribution < ActiveRecord::Base
  belongs_to :user
  belongs_to :expense
  attr_accessible :amount

	validates_uniqueness_of :user_id, :scope => :expense_id
	
	# Returns a percentage of the contribution of the total cost of the expense
  # @return [BigDecimal] percent of the expense
  def percentage
  	amount / expense.cost
  end

  def serializable_hash(*args)
    args[0] ||= {}
    args[0][:include] = [:expense, :user]
    super
  end
end
