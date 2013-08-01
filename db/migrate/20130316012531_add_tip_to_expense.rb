class AddTipToExpense < ActiveRecord::Migration
  def change
  	add_column :expenses, :tip, :decimal, :precision => 8, :scale => 2, :default => 0.0
  	add_column :expenses, :tip_included, :boolean, :default => false
  end
end
