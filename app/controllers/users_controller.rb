# Controller for registering, updating, and deleting users
class UsersController < ApplicationController
	respond_to :json

	# Gets a list of all the users for the application or a trip. Should be master only feature for application, trip member only feature for trip.
  #
  # @example
  #  #GET /users
  #  #GET /trips/1/users
  #
  # [URL] /users [GET]
  #  [200 OK] Successfully retrieved Array of users
  #   # Example response
  #   [{
  #    "name" => "Ryan Norman",
  #    "email" => "ryann@hesonline.com"
  #   }]
	def index
		@users = params[:trip_id] ? Trip.find(params[:trip_id]).member_details : User.all
		respond_with @users
	end

  def login
    @user = User.find_by_email_and_password(user_params[:email], user_params[:password])

    if @user
      respond_with @user
    else
      render :unauthorized
    end
  end

	# Gets a user matching the id
  #
  # @example
  #  #GET /users/1
  #
  # [URL] /users/:id [GET]
  #  [200 OK] Successfully retrieved a user
  #   # Example response
  #   {
  #    "name" => "Ryan Norman",
  #    "email" => "ryann@hesonline.com"
  #   }
	def show
		@user = User.find(params[:id])

    @user.current_trip = @user.trips.find(params[:trip_id]) if params[:member]

		respond_with @user
	end

	# Creates a user with the passed parameters
  #
  # @example
  #  #POST /users, {
  #    user: {
  #      name: 'Ryan Norman',
  #      email: 'ryann@hesonline.com'
  #    }
  #  }
  #
  # [URL] /users [POST]
  #  [201 CREATED] Successfully created a user
  #   # Example response
  #   {
  #    "name" => "Ryan Norman",
  #    "email" => "ryann@hesonline.com"
  #   }
	def create
		@user = User.create(user_params)
		respond_with @user
	end

	# Updates a user with the passed parameters
	#
	# @example
	#  #PUT /users, {
  #    user: {
  #      name: 'Ryan Norman',
  #      email: 'ryann@hesonline.com'
  #    }
  #  }
  #
  # [URL] /users [PUT]
  #  [204 NO CONTENT] Successfully updated a user
	def update
		@user ||= User.find(params[:id])
		@user.update_attributes(user_params)
		respond_with @user
	end

	# Deletes a user matching the id
	#
	# @example
	#  #DELETE /users/1
  #
  # [URL] /users [DELETE]
  #  [204 NO CONTENT] Successfully deleted a user
	def destroy
		@user ||= User.find(params[:id])
		@user.destroy
		respond_with @user
	end

	private

	def user_params
		params.require(:user).permit(:email, :name, :password)
	end
end
