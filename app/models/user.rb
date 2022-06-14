# frozen_string_literal: true

class User < ApplicationRecord
  extend FriendlyId
  authenticates_with_sorcery!
  has_many :authentications, :dependent => :destroy
  accepts_nested_attributes_for :authentications
  friendly_id :random_slug, use: :slugged


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


  private

  def random_slug
      [*'a'..'z',*'A'..'Z',*'0'..'9'].sample(10).join
  end
end
