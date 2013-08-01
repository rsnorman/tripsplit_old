require "spec_helper"
require 'support/auth_helper'

describe "/users" do
	 include AuthHelper

  before(:each) do
    @user = Factory(:user)
  end

  describe "GET /users" do
    it "should return a list of users" do
      get "/users", {:format => :json}, auth_parameters

      response.should be_ok
      users = JSON.parse(response.body)

      users.collect{|x| x['id']}.should include @user.id
    end
  end

  describe "GET /trips/:trip_id/members" do
    it "should return a list of members for a trip" do
      trip = Factory(:trip, :organizer => @user)
      member = Factory(:user)
      non_member = Factory(:user)
      trip.add_member(member)

      get "/trips/#{trip.id}/members", {:format => :json}, auth_parameters

      response.should be_ok
      members = JSON.parse(response.body)

      members.size.should eq 2
      members.collect{|x| x['id']}.should include @user.id
      members.collect{|x| x['id']}.should include member.id
      members.collect{|x| x['id']}.should_not include non_member.id
    end
  end

  describe "GET /users/:id" do
    it "should return a user matching the id" do
      get "/users/#{@user.id}", {:format => :json},  auth_parameters

      response.should be_ok
      user = JSON.parse(response.body)

      user['id'].should eq @user.id
    end
  end

  describe "POST /users" do
    it "should create a user with all the attributes" do
      user_attrs = Factory.attributes_for(:user, :name => "Jessica Garvey", :email => "jlgarvey@svsu.edu")
      post "/users", {:format => :json, :user => user_attrs}

      response.status.should eq 201
      user = JSON.parse(response.body)

      user['name'].should eq "Jessica Garvey"
      user['email'].should eq 'jlgarvey@svsu.edu'
    end
  end

  describe "PUT /users/:id" do
    it "should update a user matching the id" do
      user_attrs = Factory.attributes_for(:user, :name => "Jessica Garvey", :email => "jlgarvey@svsu.edu")
      put "/users/#{@user.id}", {:format => :json, :user => user_attrs}, auth_parameters

      response.status.should eq 204

      get "/users/#{@user.id}", :format => :json
      user = JSON.parse(response.body)
      user['name'].should eq "Jessica Garvey"
      user['email'].should eq 'jlgarvey@svsu.edu'
    end
  end

  describe "DELETE /users/:id" do
    it "should return a user matching the id" do
      delete "/users/#{@user.id}", {:format => :json}, auth_parameters
      response.status.should eq 204
      
      expect { get "/users/#{@user.id}", :format => :json }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

end
