class SessionsController < ApplicationController

  def create
    client = env['omniauth.auth']
    cookie_user = JSON.parse(cookies['User']) if cookies['User'] && cookies['User'] != 'null'
    @logged_in_user = User.find(cookie_user['id']) if cookie_user && cookie_user['id']

    if params[:provider] == 'twitter'
      @twitter_user = User.find_by_twitter_id(client.uid)

      if @twitter_user.nil?
        @user = @logged_in_user
      elsif @logged_in_user.nil?
        @user = @twitter_user
      elsif @logged_in_user && @twitter_user.twitter_id != @logged_in_user.twitter_id
        if @twitter_user.created_at > @logged_in_user.created_at
          @logged_in_user.connect(@twitter_user)
          @user = @logged_in_user
        else
          @twitter_user.connect(@logged_in_user)
          @user = @twitter_user
        end
      end

      @user ||= User.new

      @user.name ||= client.info.name
      @user.twitter_id = client.uid
      @user.twitter_access_token = client.credentials.token
      @user.twitter_access_secret = client.credentials.secret
      @user.profile_image_url = client.info.image

    elsif params[:provider] == 'facebook'
      @facebook_user = User.find_by_facebook_id(client.uid)

      if @facebook_user.nil?
        @user = @logged_in_user
      elsif @logged_in_user.nil?
        @user = @facebook_user
      elsif @logged_in_user && @facebook_user.twitter_id != @logged_in_user.twitter_id
        if @facebook_user.created_at > @logged_in_user.created_at
          @logged_in_user.connect(@facebook_user)
          @user = @logged_in_user
        else
          @facebook_user.connect(@logged_in_user)
          @user = @facebook_user
        end
      end

      @user ||= User.new

      @user.name ||= client.info.name
      @user.facebook_id = client.uid
      @user.profile_image_url = client.info.image
      @user.facebook_access_token = client.credentials.token
      @user.facebook_access_token_expires_at = Time.at(client.credentials.expires_at)

    end

    @user.save!

    unless cookie_user
      redirect_to "http://#{request.host}#{":9000" if Rails.env.development?}/#/users/#{@user.id}"
    else
      redirect_to "http://#{request.host}#{":9000" if Rails.env.development?}/#/users/#{@user.id}/edit"
    end

  end

  def error
    flash[:error] = "Sign in with #{params[:strategy].titleize} failed"
    redirect_to "/"
  end

end
