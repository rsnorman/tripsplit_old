class AddIsPaidToContribution < ActiveRecord::Migration
  def change
  	add_column :expense_contributions, :is_paid, :boolean, :default => false
  end
end
