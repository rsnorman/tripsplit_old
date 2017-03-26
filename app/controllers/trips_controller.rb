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
		@trips = params[:organized] ? current_user.organized_trips : current_user.trips
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
		@trip = current_user.trips.find(params[:id])
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
		@trip = current_user.trips.build(trip_params)
    @trip.organizer_id = current_user.id
    @trip.save
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
		process_picture
		@trip = current_user.organized_trips.find(params[:id])
		@trip.update_attributes(trip_params)
	end

	# Deletes a trip matching the id
	#
	# @example
	#  #DELETE /trips/1
  #
  # [URL] /trips [DELETE]
  #  [204 NO CONTENT] Successfully deleted a trip
	def destroy
		@trip = current_user.organized_trips.find(params[:id])
		@trip.destroy
		respond_with @trip
	end

	private

	def process_picture
		tempfile = Tempfile.new(["trip-picture-#{SecureRandom.uuid}", params[:trip][:picture_file_name]])
		tempfile << params[:trip][:picture]
		params[:trip][:picture]
	ensure
		tempfile.close
	end

	def trip_params
		params.require(:trip).permit(:name, :location, :starts_on, :ends_on, :description, :picture, :needs_facebook_event).tap do |p|
			p.delete(:picture) if p[:picture].blank?
		end
	end
end
