class CreateTripMemberships < ActiveRecord::Migration
  def change
    create_table :trip_memberships do |t|
      t.references :user, :trip

      t.timestamps
    end

    add_index :trip_memberships, :trip_id
    add_index :trip_memberships, :user_id
  end
end
