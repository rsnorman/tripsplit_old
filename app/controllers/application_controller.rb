class ApplicationController < ActionController::Base

  before_filter :redirect_to_hash_path
  before_filter :set_user_from_header
  private


  def set_user_from_header
    @user = User.find_by_id(request.env["HTTP_USER"])
  end

  def twitter_client
    @twitter_client ||= Twitter::Client.new(
    :consumer_key => ENV['JUNKETEER_TWITTER_CONSUMER_KEY'],
    :consumer_secret => ENV['JUNKETEER_TWITTER_CONSUMER_SECRET'],
    :oauth_token => session[:access_token] || @user.twitter_access_token,
    :oauth_token_secret => session[:access_secret] || @user.twitter_access_secret
    )
  end

  def facebook_client
    @facebook_client ||= Koala::Facebook::API.new(@user.facebook_access_token)
  end

  def redirect_to_hash_path
    if request.format.symbol != :json && params[:provider].nil?
      Rails.logger.info request.original_fullpath
      redirect_to "#{":9000" if Rails.env.development?}/##{request.original_fullpath}" and return false
    end
  end
end
