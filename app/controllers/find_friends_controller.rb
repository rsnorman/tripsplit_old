class FindFriendsController < ApplicationController
	respond_to :json

	def twitter_friends
		respond_with [client.friends.users.first]
	end

	def invite_twitter_friend
		@trip = Trip.find(params[:trip_id])
		@member = User.find_by_twitter_id(params[:twitter_id])

		unless @member
			@member = User.new
			@member.name = params[:name]
			@member.twitter_id = params[:twitter_id]
			@member.save!
		end


		client.direct_message_create(params[:twitter_id].to_i, "Let's get weird during #{@trip.name}. http://www.group-expenser.dev:9000/#/join/#{@member.id}") unless Rails.env.test?

		@membership = @trip.add_member(@member)
		respond_with @membership
	end
end
