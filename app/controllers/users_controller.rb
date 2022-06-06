# frozen_string_literal: true
class UsersController < ApplicationController
  require 'open-uri'
  include Rails.application.routes.url_helpers
  before_action :set_user, only: %i[show edit update destroy]
  skip_before_action :require_login, only: %i[index new create activate]
  # GET /users or /users.json
  def index
    @users = User.all
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit; end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        @user.avatar.attach(user_img(@user.id.to_s))
        format.html { redirect_to new_user_session_path, notice: '註冊成功' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        # user_url(@user)
        format.html do
          redirect_to :user, notice: '個人資訊已更新'
        end
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: '帳戶已成功刪除' }
      format.json { head :no_content }
    end
  end

  def activate
    @user = User.load_from_activation_token(params[:id])
    if @user
      @user.activate!
      flash[:notice] = '帳戶已成功啟用'
      redirect_to new_user_session_path
    else
      flash[:alert] = '帳戶無法啟用'
      redirect_to root_path
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :nickname, :address).merge(address:params[:user][:zipcode] + params[:user][:county] + params[:user][:district] + params[:user][:address])
  end

  def user_img(id)
    {io: open("https://robohash.org/#{id}") , filename: id + "_images.jpg"}
  end
end
