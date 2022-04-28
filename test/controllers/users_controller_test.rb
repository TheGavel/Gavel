# frozen_string_literal: true

require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test 'should get index' do
    get users_url
    assert_response :success
  end

  test 'should get new' do
    get new_user_url
    assert_response :success
  end

  test 'should create user' do
    assert_difference('User.count') do
      post users_url,
           params: { user: { address: @user.address, crypted_password: @user.crypted_password, email: @user.email,
                             is_seller: @user.is_seller, level: @user.level, nickname: @user.nickname,
                             phone: @user.phone, salt: @user.salt, username: @user.username } }
    end

    assert_redirected_to user_url(User.last)
  end

  test 'should show user' do
    get user_url(@user)
    assert_response :success
  end

  test 'should get edit' do
    get edit_user_url(@user)
    assert_response :success
  end

  test 'should update user' do
    patch user_url(@user),
          params: { user: { address: @user.address, crypted_password: @user.crypted_password, email: @user.email,
                            is_seller: @user.is_seller, level: @user.level, nickname: @user.nickname,
                            phone: @user.phone, salt: @user.salt, username: @user.username } }
    assert_redirected_to user_url(@user)
  end

  test 'should destroy user' do
    assert_difference('User.count', -1) do
      delete user_url(@user)
    end

    assert_redirected_to users_url
  end
end
