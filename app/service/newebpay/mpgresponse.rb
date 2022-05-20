module Newebpay
  class Mpgresponse
    attr_reader :status, :message, :result, :order_no, :trans_no, :merchant_id, :amount, :payment_type, :respond_type, :paytime, :trade_ip, :escrow_bank, :auth_bank, :respond_code, :auth, :card6_no, :card4_no, :payment_method

    def initialize(params)
      @key = ENV['NEWEBPAY_KEY']
      @iv = ENV['NEWEBPAY_IV']

      response = decrypy(params)
      @status = response['Status']
      @message = response['Message']
      @result = response['Result']
      @merchant_id = @result['MerchantID']
      @amount = @result['Amt']
      @trans_no = @result['TradeNo']
      @order_no = @result['MerchantOrderNo']
      @payment_type = @result['PaymentType']
      @respond_type = @result['RespondType']
      @paytime = @result['PayTime']
      @trade_ip = @result['IP']
      @escrow_bank = @result['EscrowBank']
      @auth_bank = @result['AuthBank']
      @respond_code = @result['RespondCode']
      @auth = @result['Auth']
      @card6_no = @result['Card6No']
      @card4_no = @result['Card4No']
      @payment_method = @result['PaymentMethod']
    end

    def success?
      status === 'SUCCESS'
    end

    private

      def decrypy(encrypted_data)
        encrypted_data = [encrypted_data].pack('H*')
        decipher = OpenSSL::Cipher::AES256.new(:CBC)
        decipher.decrypt
        decipher.padding = 0
        decipher.key = @key
        decipher.iv = @iv
        data = decipher.update(encrypted_data) + decipher.final
        raw_data = strippadding(data)
        JSON.parse(raw_data)
      end

      def strippadding(data)
        slast = data[-1].ord
        slastc = slast.chr
        string_match = /#{slastc}{#{slast}}/ =~ data
        if !string_match.nil?
          data[0, string_match]
        else
          false
        end
      end
  end
end
