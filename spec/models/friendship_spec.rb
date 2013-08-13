require 'spec_helper'

describe Friendship do
  it "should not allow duplicate friendships for a user" do
  	user = Factory(:user)
  	friend = Factory(:user)
  	user.friendships << Friendship.new(:friend_id => friend.id)
  	expect { user.friendships << Friendship.new(:friend_id => friend.id) }.to change(Friendship, :count).by 0
  end
end
