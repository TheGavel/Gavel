class SmsVerification
  include ActiveModel::Model
  attr_accessor :code

  validates :code, presence: true
  validates :code,
            numericality: {
              only_integer: true,
              message: '驗證碼錯誤'
            }
  validates :code,
            length: {
              is: 6,
              message: '驗證碼錯誤'
            }
end
