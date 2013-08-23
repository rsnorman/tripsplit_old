class AddIsLoanToExpense < ActiveRecord::Migration
  def change
  	add_column :expenses, :is_loan, :boolean
  end
end
