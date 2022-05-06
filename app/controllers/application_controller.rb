# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization
  before_action :require_login


  private

  def not_authenticated
    redirect_to login_path, alert: 'Please login first'
  end

end
