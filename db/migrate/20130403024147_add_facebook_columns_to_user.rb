class AddFacebookColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :facebook_access_token, :string
    add_column :users, :facebook_access_token_expires_at, :datetime
    add_column :users, :facebook_id, :string
  end
end
