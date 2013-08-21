class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
    	t.references :organizer
      t.string :name
      t.text :description
      t.string :facebook_event_id

      t.timestamps
    end

    add_index :trips, :organizer_id
  end
end
