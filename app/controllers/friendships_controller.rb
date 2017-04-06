# Controller for creating, updating, and deleting friendships
class FriendshipsController < ApplicationController
	respond_to :json

  # Gets a list of all the friends for the application or a user. 
  #
  # @example
  #  #GET /friendships
  #
  # [URL] /friends [GET]
  #  [200 OK] Successfully retrieved Array of friends
  #   # Example response
  #   [{
  #    "name" => "Ryan Norman" 
  #   }]
	def index
		@friends = @user.friends
		respond_with @friends
	end


  # Creates a friend with the passed parameters
  #
  # @example
  #  #POST /friendships, {
  #    friendship: {
  #      friend_id: 1
  #    }
  #  }
  #
  # [URL] /friendships [POST]
  #  [201 CREATED] Successfully created a friendship
  #   # Example response
  #   {
  #    "user_id" => 1,
  #    "friend_id" => 2
  #   }
	def create
		@friendship = @user.friendships.build
		@friendship.friend_id = params[:friendship][:friend_id]
		@friendship.save
		respond_with @friendship
	end


	# Deletes a friend matching the id
	#
	# @example
	#  #DELETE /friends/1
  #
  # [URL] /friends [DELETE]
  #  [204 NO CONTENT] Successfully deleted a friend
	def destroy
		@friendship = @user.friendships.where(:friend_id => params[:id]).first
		@friendship.destroy
		respond_with @friendship
	end
end
