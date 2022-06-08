class Order < ApplicationRecord
  include AASM

  aasm column: "status" do
    state :pending, initial: true
    state :paid, :failed, :cancelled

    event :pay do
      transitions from: [:pending , :failed], to: :paid
    end

    event :fail do
      transitions from: :pending, to: :failed
    end

    event :cancel do
      transitions from: :failed, to: :cancelled
    end
  end

  def self.statusTW(s)
    status = { paid: "已付款" , pending: "待付款", failed:"付款失敗" , canceled:"取消訂單"}
    status[s.to_sym]
  end

  belongs_to :product
  belongs_to :buyer, :class_name => "User"
  belongs_to :seller, :class_name => "User"
end
