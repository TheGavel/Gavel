# frozen_string_literal: true

class User < ApplicationRecord
  authenticates_with_sorcery!
  has_many :authentications, :dependent => :destroy
  accepts_nested_attributes_for :authentications

  validates :email, :username, uniqueness: true, presence: true
  validates :password, confirmation: true,length: { minimum: 6 },
    if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true,
    if: lambda {new_record? || changes[:crypted_password]}

  has_many :products
  has_many :seller_orders, class_name: 'Order', foreign_key: 'seller_id'
  has_many :buyer_orders, class_name: 'Order', foreign_key: 'buyer_id'
  has_many :boughtlist
  has_many :boughtproducts, through: :boughtlist, source: :product
  has_one_attached :avatar
end
