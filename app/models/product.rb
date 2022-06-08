# frozen_string_literal: true

class Product < ApplicationRecord
  include AASM

  # aasm column: "status" do
  #   state :draft , :publish, :soldout

  #   event :onshelf do
  #     transitions from: :draft, to: :publish
  #   end

  #   event :offshelf do
  #     transitions from: :publish, to: :draft
  #   end

  #   event :sold do
  #     transitions from: :publish, to: :soldout
  #   end
  # end



  searchkick  searchable: [:name],
              word_middle: [:name],
              callbacks: :async

  validates :name, :images, presence: true
  validates :description, presence: true, length: { minimum: 10 }
  validates :start_price,:basicprice, presence:true,numericality: { greater_than: 0,  only_integer: true }

  belongs_to :user
  has_one :room
  has_many_attached :images do |attachable|
    attachable.variant :thumb, resize_to_limit: [600, 300]
  end
  has_one :order

  has_one :boughtlist
  has_one :owner, through: :boughtlist, source: :user
  has_many :products_tags, dependent: :destroy
  has_many :tags, through: :products_tags
  has_many :records
  def self.all_status
    [
      %w[草稿 draft],
      %w[發布 publish]
    ]
  end
end
