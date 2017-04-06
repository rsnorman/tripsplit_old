class CreateExpenseObligations < ActiveRecord::Migration
  def change
    create_table :expense_obligations do |t|
      t.references :user
      t.references :expense
      t.decimal :amount, :precision => 8, :scale => 2

      t.timestamps
    end
    
    add_index :expense_obligations, :user_id
    add_index :expense_obligations, :expense_id
  end
end
