class SessionsController < ApplicationController

  def create
    client = env['omniauth.auth']

    if params[:provider] == 'twitter'      
      @user = User.find_by_twitter_id(client.uid) || User.new

      @user.name ||= client.info.name
      @user.twitter_id = client.uid
      @user.twitter_access_token = client.credentials.token
      @user.twitter_access_secret = client.credentials.secret
      @user.profile_image_url = client.info.image

    elsif params[:provider] == 'facebook'
      @user = User.find_by_facebook_id(client.uid) || User.new

      @user.name ||= client.info.name
      @user.facebook_id = client.uid
      @user.profile_image_url = client.info.image
      @user.facebook_access_token = client.credentials.token
      @user.facebook_access_token_expires_at = Time.at(client.credentials.expires_at)

    end

    @user.save!

    redirect_to "http://www.group-expenser.dev:9000/#/users/#{@user.id}"
  end

  def error
    flash[:error] = "Sign in with #{params[:provider].titleize} failed"
    redirect_to root_path
  end

end
