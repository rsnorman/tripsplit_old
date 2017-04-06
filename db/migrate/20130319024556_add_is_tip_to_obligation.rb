class AddIsTipToObligation < ActiveRecord::Migration
  def change
  	add_column :expense_obligations, :is_tip, :boolean, :default => false
  end
end
