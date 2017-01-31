require "spec_helper"
require 'support/auth_helper'

describe "/trips", type: :request  do
  include AuthHelper

  before(:each) do
    @user = FactoryGirl.create(:user)
    @trip = FactoryGirl.create(:trip, :organizer => @user)
  end

  describe "POST /trips" do
    it "should create a membership for the user in a trip" do
      new_member = FactoryGirl.create(:user)
      post "/trips/#{@trip.id}/memberships", {:format => :json, :membership => {:user_id => new_member.id}}, auth_parameters

      response.status.should eq 201
      membership = JSON.parse(response.body)

      membership['trip_id'].should eq @trip.id
      membership['user_id'].should eq new_member.id
    end

    it "should not allow a member that is not the organizer to create a membership" do
      other_trip = FactoryGirl.create(:trip)
      expect { post "/trips/#{other_trip.id}/memberships", {:format => :json, :membership => {:user_id => @user.id}}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end


  describe "DELETE /trips/:id" do
    it "should return a trip matching the id" do
      user = FactoryGirl.create(:user)
      @trip.add_member(user)
      delete "/trips/#{@trip.id}/memberships/#{@trip.memberships.last.id}", {:format => :json}, auth_parameters
      response.status.should eq 204

      @trip.reload
      @trip.memberships.size.should eq 1
      @trip.members.should_not include user
    end

    it "should not allow a member that is not the organizer to delete a membership" do
      other_trip = FactoryGirl.create(:trip)
      user = FactoryGirl.create(:user)
      other_trip.add_member(user)
      expect { delete "/trips/#{other_trip.id}/memberships/#{other_trip.memberships.last.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end
end
