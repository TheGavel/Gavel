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


  belongs_to :product
  belongs_to :user
end
