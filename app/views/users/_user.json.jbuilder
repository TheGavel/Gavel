# frozen_string_literal: true

json.extract! user, :id, :email, :crypted_password, :salt, :username, :nickname, :phone, :address, :is_seller, :level,
              :created_at, :updated_at
json.url user_url(user, format: :json)
