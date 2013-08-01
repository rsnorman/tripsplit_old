# Controller for registering, updating, and deleting trips
class TripsController < ApplicationController
	respond_to :json

	# Gets a list of all the trips for the application or a user.
  #
  # @example
  #  #GET /trips
  #  #GET /organized_trips
  #
  # [URL] /trips [GET]
  #  [200 OK] Successfully retrieved Array of trips
  #   # Example response
  #   [{
  #    "name" => 'Mt bROhemia'
  #   }]
	def index
		@trips = params[:organized] ? @user.organized_trips : @user.trips
		respond_with @trips
	end

	# Gets a trip matching the id
  #
  # @example
  #  #GET /trips/1
  #
  # [URL] /trips/:id [GET]
  #  [200 OK] Successfully retrieved a trip
  #   # Example response
  #   {
  #    "name" => 'Mt bROhemia'
  #   }
	def show
		@trip = @user.trips.find(params[:id])
		respond_with @trip
	end

	# Creates a trip with the passed parameters
  #
  # @example
  #  #POST /trips, {
  #    trip: {
  #      name: 'Mt bROhemia'
  #    }
  #  }
  #
  # [URL] /trips [POST]
  #  [201 CREATED] Successfully created a trip
  #   # Example response
  #   {
  #    "name" => 'Mt bROhemia'
  #   }
	def create
		@trip = @user.trips.build(params[:trip])
    @trip.organizer_id = @user.id
    @trip.save
		respond_with @trip
	end

	# Updates a trip with the passed parameters
	#
	# @example
	#  #PUT /trips, {
  #    trip: {
  #      name: 'Mt bROhemia'
  #    }
  #  }
  #
  # [URL] /trips [PUT]
  #  [204 NO CONTENT] Successfully updated a trip
	def update
		@trip = @user.organized_trips.find(params[:id])
		@trip.update_attributes(params[:trip])
		respond_with @trip
	end

	# Deletes a trip matching the id
	#
	# @example
	#  #DELETE /trips/1
  #
  # [URL] /trips [DELETE]
  #  [204 NO CONTENT] Successfully deleted a trip
	def destroy
		@trip = @user.organized_trips.find(params[:id])
		@trip.destroy
		respond_with @trip
	end
end
