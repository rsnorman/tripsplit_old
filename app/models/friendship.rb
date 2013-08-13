class Friendship < ActiveRecord::Base
  attr_accessible :friend_id
  belongs_to :user
  belongs_to :friend, :class_name => 'User'
  validates_uniqueness_of :friend_id, :scope => :user_id
end
