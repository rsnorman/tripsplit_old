class ApplicationController < ActionController::Base

  before_filter :set_user_from_header
  private


  def set_user_from_header
    @user = User.find_by_id(request.env["HTTP_USER"])
  end

  def client
    @client ||= Twitter::Client.new(
    :consumer_key => JUNKETEER_TWITTER_CONSUMER_KEY,
    :consumer_secret => JUNKETEER_TWITTER_CONSUMER_SECRET,
    :oauth_token => session[:access_token] || @user.twitter_access_token,
    :oauth_token_secret => session[:access_secret] || @user.twitter_access_secret
    )

  end
end
