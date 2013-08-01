class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
    	t.references :purchaser, :trip
      t.string :name
      t.string :expense_type
      t.decimal :cost, :precision => 8, :scale => 2

      t.timestamps
    end

    add_index :expenses, :purchaser_id
    add_index :expenses, :trip_id
  end
end
