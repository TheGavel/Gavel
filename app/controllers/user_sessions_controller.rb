# frozen_string_literal: true

class UserSessionsController < ApplicationController
  skip_before_action :require_login, only: %i[new create]
  def create
    @user = login(params[:email], params[:password])
    if @user
      redirect_back_or_to root_path, notice: '登入成功'
    else
      flash.now[:alert] = '登入失敗，請確認帳號密碼'
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_to new_user_session_path, notice: '已成功登出!'
  end
end
