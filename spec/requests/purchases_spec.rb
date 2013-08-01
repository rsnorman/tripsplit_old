require "spec_helper"
require 'support/auth_helper'

describe "/purchases" do
  include AuthHelper

  before(:each) do
    @user = Factory(:user)
    @trip = Factory(:trip, :organizer => @user)
    @purchase = Factory(:expense, :trip => @trip, :purchaser => @user, :cost => 50, :expense_type => 'Gas', :name => 'Sunoco Gas Fillup')
  end

  describe "GET /purchases" do
    it "should return a list of purchases the user has purchased on all trips" do
      get "/purchases", {:format => :json}, auth_parameters

      response.should be_ok
      purchases = JSON.parse(response.body)

      purchases.collect{|x| x['id']}.should include @purchase.id
    end


    it "should return a list of purchases purchashed by a user on a trip" do
      get "/trips/#{@trip.id}/purchases", {:format => :json}, auth_parameters

      response.should be_ok
      purchases = JSON.parse(response.body)

      purchases.collect{|x| x['id']}.should include @purchase.id
    end

    it "should not return any purchases not purchased by a user on a trip" do
      other_user = Factory(:user)
      other_purchase = Factory(:expense, :trip_id => @trip.id, :purchaser => other_user)

      get "/trips/#{@trip.id}/purchases", {:format => :json}, auth_parameters

      response.should be_ok
      purchases = JSON.parse(response.body)

      purchases.collect{|x| x['id']}.should_not include other_purchase.id
    end
  end


  describe "GET /purchases/:id" do
    it "should return a purchase matching the id" do
      get "/purchases/#{@purchase.id}", {:format => :json}, auth_parameters

      response.should be_ok
      purchase = JSON.parse(response.body)

      purchase['id'].should eq @purchase.id
    end

    it "should not return an purchase not purchased on one of the user's trips" do
      other_purchase = Factory(:expense)

      expect { get "/purchases/#{other_purchase.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

  describe "PUT /purchases/:id" do
    it "should update a purchase matching the id" do
      purchase_attrs = Factory.attributes_for(:expense, :cost => 45)
      put "/purchases/#{@purchase.id}", {:format => :json, :expense => purchase_attrs}, auth_parameters

      response.status.should eq 204

      get "/purchases/#{@purchase.id}", {:format => :json}, auth_parameters
      purchase = JSON.parse(response.body)
      purchase['cost'].should eq "45.0"
    end

    it "should not update an purchase that is not purchased by user" do
    	other_purchase = Factory(:expense, :trip => @trip)
      purchase_attrs = Factory.attributes_for(:expense, :cost => 45)
      expect { put "/purchases/#{other_purchase.id}", {:format => :json, :expense => purchase_attrs}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

  describe "DELETE /purchases/:id" do
    it "should delete a purchase by the user" do
      delete "/purchases/#{@purchase.id}", {:format => :json}, auth_parameters
      response.status.should eq 204

      expect { get "/purchases/#{@purchase.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end

    it "should raise an error if user tries to delete an purchase not purchased by them" do
    	other_purchase = Factory(:expense, :trip => @trip)
    	expect { delete "/purchases/#{other_purchase.id}", {:format => :json}, auth_parameters }.to raise_exception ActiveRecord::RecordNotFound
    end
  end

end
