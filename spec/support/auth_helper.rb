module AuthHelper
  def auth_parameters(user = @user)
    @cached_user = user || @cached_user || Factory(:user)
    {'HTTP_USER' => @cached_user.key}
  end
 end