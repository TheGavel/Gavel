class SmsRegistration
  include ActiveModel::Model
  attr_accessor :email, :cellphone

  validates :email, presence: true
  validates :cellphone, presence: true, format: { with: /^09\d{8}/, message: '手機格式不對請重新確認，開頭09後8位數。', multiline: true }
end
