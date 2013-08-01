class AddExtraFieldsToTrip < ActiveRecord::Migration
  def change
  	add_column :trips, :location, :string
  	add_column :trips, :starts_on, :date
  	add_column :trips, :ends_on, :date
  	add_column :trips, :cover_photo, :string
  end
end
