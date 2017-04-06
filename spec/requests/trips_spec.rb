require "spec_helper"
require 'support/auth_helper'

describe "/trips", type: :request  do
  include AuthHelper

  before(:each) do
    @user = FactoryGirl.create(:user)
    @trip = FactoryGirl.create(:trip, :organizer => @user)
  end

  describe "GET /trips" do
    it "should return a list of trips the user is a member of" do
      get "/trips", {:format => :json}, auth_parameters

      response.should be_ok
      trips = JSON.parse(response.body)

      trips.collect{|x| x['id']}.should include @trip.id
    end

    it "should not return trips that the user is not a member of" do
    	not_member_of_trip = FactoryGirl.create(:trip)

    	get "/trips", {:format => :json}, auth_parameters

      response.should be_ok
      trips = JSON.parse(response.body)

      trips.collect{|x| x['id']}.should_not include not_member_of_trip.id
    end
  end

  describe "GET /organized_trips" do

    it "should return trips that the user organized" do
    	get "/organized_trips", {:format => :json}, auth_parameters

    	response.should be_ok
    	trips = JSON.parse(response.body)

    	trips.collect{|x| x['id']}.should include @trip.id
    end

    it "should not return a trip that the user organized" do
    	not_organized_trip = FactoryGirl.create(:trip)
      not_organized_trip.add_member(@user)

    	get "/organized_trips", {:format => :json}, auth_parameters

    	response.should be_ok
    	trips = JSON.parse(response.body)

    	trips.collect{|x| x['id']}.should_not include not_organized_trip.id
    end
  end

  describe "GET /trips/:id" do
    it "should return a trip matching the id" do
      get "/trips/#{@trip.id}", {:format => :json}, auth_parameters

      response.should be_ok
      trip = JSON.parse(response.body)

      trip['id'].should eq @trip.id
    end
  end

  describe "POST /trips" do
    it "should create a trip with all the attributes" do
      trip_attrs = FactoryGirl.attributes_for(:trip, :name => "Mt BROhemia")
      post "/trips", {:format => :json, :trip => trip_attrs}, auth_parameters

      response.status.should eq 201
      trip = JSON.parse(response.body)

      trip['name'].should eq "Mt BROhemia"
    end

    it "should create a trip with the user who created it as the organizer" do
      trip_attrs = FactoryGirl.attributes_for(:trip, :name => "Mt BROhemia")
      post "/trips", {:format => :json, :trip => trip_attrs}, auth_parameters

      response.status.should eq 201
      trip = JSON.parse(response.body)

      trip['organizer_id'].should eq @user.id
    end
  end

  describe "PUT /trips/:id" do
    it "should update a trip matching the id" do
      trip_attrs = FactoryGirl.attributes_for(:trip, :name => "Mt BROhemia")
      put "/trips/#{@trip.id}", {:format => :json, :trip => trip_attrs}, auth_parameters

      response.status.should eq 204

      get "/trips/#{@trip.id}", {:format => :json}, auth_parameters
      trip = JSON.parse(response.body)
      trip['name'].should eq "Mt BROhemia"
    end
  end

  describe "DELETE /trips/:id" do
    it "should return a trip matching the id" do
      delete "/trips/#{@trip.id}", {:format => :json}, auth_parameters
      response.status.should eq 204

      expect { get "/trips/#{@trip.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

end
