# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization
  before_action :require_login


  private

  def not_authenticated
    redirect_to new_user_session_path, alert: '請先登入'
  end

end
