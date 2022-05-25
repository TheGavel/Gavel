class Order < ApplicationRecord
  include AASM

  aasm column: "status" do
    state :pending, initial: true
    state :Paid, :Failed, :cancelled

    event :pay do
      transitions from: [:pending , :Failed], to: :Paid
    end

    event :fail do
      transitions from: :pending, to: :Failed
    end

    event :cancel do
      transitions from: :Failed, to: :cancelled
    end
  end


  belongs_to :product
  belongs_to :user
end
