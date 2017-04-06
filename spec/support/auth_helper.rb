module AuthHelper
  def auth_parameters(user = @user)
    @cached_user = user || @cached_user || FactoryGirl.create(:user)
    {'HTTP_USER' => @cached_user.key}
  end
 end