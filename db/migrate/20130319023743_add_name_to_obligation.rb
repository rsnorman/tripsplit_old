class AddNameToObligation < ActiveRecord::Migration
  def change
  	add_column :expense_obligations, :name, :string
  end
end
