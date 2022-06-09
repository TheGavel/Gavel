require 'open-uri'
# app/controllers/oauths_controller.rb
class OauthsController < ApplicationController
  skip_before_action :require_login, raise: false

  # sends the user on a trip to the provider,
  # and after authorizing there back to the callback url.
  def oauth
    login_at(params[:provider])
  end

  def callback
    provider = params[:provider]
    if @user = login_from(provider)
      @user.activate!

      if not @user.avatar.attached?
        @user.update(username: @user.email.split('@')[0])
        @user.avatar.attach({io: open("https://robohash.org/#{@user.id.to_s}") , filename: @user.id.to_s+"_images.jpg"})
      end

      redirect_to root_path, :notice => "已成功透過 #{provider.titleize} 登入！"
    else
      begin
        @user = create_from(provider)
        @user.activate!
        if not @user.avatar.attached?
          @user.update(username: @user.email.split('@')[0])
          @user.avatar.attach({io: open("https://robohash.org/#{@user.id.to_s}") , filename: @user.id.to_s+"_images.jpg"})
        end
        # NOTE: this is the place to add '@user.activate!' if you are using user_activation submodule
        reset_session # protect from session fixation attack
        auto_login(@user)
        redirect_to root_path, :notice => "已成功透過 #{provider.titleize} 登入！"
      rescue
        redirect_to root_path, :alert => "#{provider.titleize} 登入失敗！"
      end
    end
  end

  #example for Rails 4: add private method below and use "auth_params[:provider]" in place of
  #"params[:provider] above.

  # private
  # def auth_params
  #   params.permit(:code, :provider)
  # end

end
