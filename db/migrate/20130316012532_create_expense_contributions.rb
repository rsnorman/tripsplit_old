class CreateExpenseContributions < ActiveRecord::Migration
  def change
    create_table :expense_contributions do |t|
      t.references :user
      t.references :expense
      t.decimal :amount, :precision => 8, :scale => 2

      t.timestamps
    end
    
    add_index :expense_contributions, :user_id
    add_index :expense_contributions, :expense_id
  end
end
