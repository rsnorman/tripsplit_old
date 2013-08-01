class AddIsTipToObligation < ActiveRecord::Migration
  def change
  	add_column :expense_obligations, :is_tip, :boolean, :default => true
  end
end
