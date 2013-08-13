require "spec_helper"
require 'support/auth_helper'

describe "/expenses" do
  include AuthHelper

  before(:each) do
    @user = Factory(:user)
    @friend = Factory(:user)
    @user.reload
    friendship = Factory(:friendship, :user => @user, :friend => @friend)
  end

  describe "GET /friendships" do
    it "should return a list of friends for a user" do
      get "/friendships", {:format => :json}, auth_parameters

      response.should be_ok
      friends = JSON.parse(response.body)

      friends.collect{|x| x['id']}.should include @friend.id
    end

    it "should return a list of friends for a user" do
    	friendship = Factory(:friendship)
      get "/friendships", {:format => :json}, auth_parameters

      response.should be_ok
      friends = JSON.parse(response.body)

      friends.collect{|x| x['id']}.should_not include friendship.friend_id
    end

  end


  describe "POST /friendships" do
    it "should create a friendship with all the attributes" do
      friend = Factory(:user)
      post "/friendships", {:format => :json, :friendship => {:friend_id => friend.id}}, auth_parameters

      response.status.should eq 201
      friendship = JSON.parse(response.body)

      friendship["user_id"].should eq @user.id
      friendship["friend_id"].should eq friend.id
    end

    it "should not create duplicate friendships" do
      post "/friendships", {:format => :json, :friendship => {:friend_id => @friend.id}}, auth_parameters

      response.status.should eq 422
    end
  end

  describe "DELETE /friendships" do
    it "should create a friendship with all the attributes" do
      expect { delete "/friendships/#{@friend.id}", {:format => :json}, auth_parameters }.to change(@user.friends, :size).by -1
    end

    it "should not delete other friendships" do
    	friendship = Factory(:friendship)
      expect { delete "/friendships/#{friendship.friend.id}", {:format => :json}, auth_parameters }.to raise_exception
    end
  end

end
