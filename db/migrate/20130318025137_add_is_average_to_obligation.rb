class AddIsAverageToObligation < ActiveRecord::Migration
  def change
  	add_column :expense_obligations, :is_average, :boolean, :default => true
  end
end
