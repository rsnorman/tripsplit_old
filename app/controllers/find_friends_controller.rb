class FindFriendsController < ApplicationController
	respond_to :json

	def find_twitter_user
		respond_with twitter_client.user_search(params[:handle])
	end

	def invite_twitter_friend
		@trip = Trip.find(params[:trip_id])
		@member = User.find_by_twitter_id(params[:twitter_id])

		unless @member
			@member = User.new
			@member.name = params[:name]
			@member.twitter_id = params[:twitter_id]
			@member.profile_image_url = params[:profile_image_url]
			@member.save!
		end

		twitter_client.direct_message_create(params[:twitter_id].to_i, "Let's get weird during #{@trip.name}. http://#{request.host}#{":9000" if Rails.env.development?}/#/join/#{@member.id}") unless Rails.env.test?

		@membership = @trip.add_member(@member)

		respond_with @membership
	end

	def find_facebook_user
		respond_with facebook_client.fql_query("SELECT uid, name, pic_square, status FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND strpos(lower(name),lower('#{params[:name]}')) >=0")
	end

	def invite_facebook_friend
		@trip = Trip.find(params[:trip_id])
		@member = User.find_by_facebook_id(params[:facebook_id])

		unless @member
			@member = User.new
			@member.name = params[:name]
			@member.facebook_id = params[:facebook_id]
			@member.profile_image_url = params[:profile_image_url]
			@member.save!
		end



		@membership = @trip.add_member(@member)

		raise @member.inspect

		respond_with @membership
	end
end
