class AddTwitterColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :twitter_access_token, :string
  	add_column :users, :twitter_access_secret, :string
  	add_column :users, :twitter_id, :string
  	add_column :users, :profile_image_url, :string
  end
end
