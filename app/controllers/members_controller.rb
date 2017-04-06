# Controller for retrieving trip members
class MembersController < ApplicationController
	respond_to :json

	# Gets a list of all the users for a trip
  #
  # @example
  #  #GET /trips/1/members
  #
  # [URL] /trips/1/members [GET]
  #  [200 OK] Successfully retrieved Array of trip users
  #   # Example response
  #   [{
  #    "name" => "Ryan Norman",
  #    "email" => "ryann@hesonline.com"
  #   }]
	def index
    @trip = Trip.find(params[:trip_id])
		@members = @trip.members
	end
end
