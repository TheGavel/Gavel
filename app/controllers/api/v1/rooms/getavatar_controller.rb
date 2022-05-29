class Api::V1::Rooms::GetavatarController < ApplicationController
  def show
    render json: url_for(User.find(params[:id]).avatar)
  end
end
