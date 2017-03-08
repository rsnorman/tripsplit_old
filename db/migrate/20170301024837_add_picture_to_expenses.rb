class AddPictureToExpenses < ActiveRecord::Migration
  def change
    add_column :expenses, :picture, :string
  end
end
