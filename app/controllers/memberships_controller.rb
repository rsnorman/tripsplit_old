# Controller for registering, updating, and deleting memberships
class MembershipsController < ApplicationController
	respond_to :json

	# Creates a membership with the passed parameters
  #
  # @example
  #  #POST /memberships, {
  #    membership: {
  #      user_id: 1
  #    }
  #  }
  #
  # [URL] /memberships [POST]
  #  [201 CREATED] Successfully created a membership
  #   # Example response
  #   {
  #    "trip_id" => 1,
  #    "user_id" => 1
  #   }
	def create
		@membership = @user.trips.find(params[:trip_id]).memberships.create(membership_params)
		respond_with @membership
	end

	# Deletes a membership matching the id
	#
	# @example
	#  #DELETE /memberships/1
  #
  # [URL] /memberships [DELETE]
  #  [204 NO CONTENT] Successfully deleted a membership
	def destroy
		@membership = @user.trips.find(params[:trip_id]).memberships.where(:user_id => params[:id]).first
		@membership.destroy
		respond_with @membership
	end

	private

	def membership_params
		params.require(:membership).permit(:trip, :user, :trip_id, :user_id)
	end
end
