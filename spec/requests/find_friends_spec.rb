require "spec_helper"
require 'support/auth_helper'

describe "/twitter_friends" do
  include AuthHelper

  before(:each) do
    @user = Factory(:user, :twitter_id => '16950200', :twitter_access_secret => '1KfojHF14c28GTirds8yZnZrT18Ib1hDZ5WSP2p4', :twitter_access_token => '16950200-zfRfnbhjJRnJNFQ7NYJO8M015aaucrCGqJ81zOg')
    @trip = Factory(:trip, :organizer => @user)
  end

  describe "GET /twitter_friends" do
    it "should list all the current users twitter friends" do
      get "/twitter_friends", {:format => :json}, auth_parameters

      response.status.should eq 200
      friends = JSON.parse(response.body)

      friends.first['id'].should_not be_nil

    end
  end

  describe "POST /twitter_friends/invite" do
    it "should create a user and membership for a trip from a twitter user" do
      post "/twitter_friends/invite", {:format => :json, :name => 'Ryan', :twitter_id => '124234', :trip_id => @trip.id}, auth_parameters

      response.status.should eq 201
      membership = JSON.parse(response.body)

      membership['trip_id'].should eq @trip.id
      @trip.members.last.name.should eq 'Ryan'
      @trip.members.last.twitter_id.should eq '124234'
    end

    it "should create a membership for a trip from a twitter user using an old account" do
    	user2 = Factory(:user, :name => 'Ryan', :twitter_id => '124234')
    	post "/twitter_friends/invite", {:format => :json, :name => 'Ryan', :twitter_id => '124234', :trip_id => @trip.id}, auth_parameters

      response.status.should eq 201
      membership = JSON.parse(response.body)

      membership['trip_id'].should eq @trip.id
      @trip.members.last.id.should eq user2.id
      @trip.members.last.name.should eq 'Ryan'
      @trip.members.last.twitter_id.should eq '124234'
    end
  end
end
