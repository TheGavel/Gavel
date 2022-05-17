module Newebpay
  class Mpgresponse
    attr_reader :status, :message, :result, :order_no, :trans_no, :merchant_id, :amount, :payment_type, :respond_type, :paytime, :trade_ip, :escrow_bank, :auth_bank, :respond_code, :auth, :card6_no, :card4_no, :payment_method

    def initialize(params)
      @key = ENV['NEWEBPAY_KEY']
      @iv = ENV['NEWEBPAY_IV']

      response = decrypy(params)
      #trade_info回傳參數
      @status = response['Status'] #交易付款狀態
      @message = response['Message'] #交易狀態，授權成功or失敗
      @result = response['Result'] #回傳結果參數

      @merchant_id = @result['MerchantID'] #商店代號
      @amount = @result['Amt'] #交易金額
      @trans_no = @result['TradeNo'] #交易序號
      @order_no = @result['MerchantOrderNo'] #訂單編號
      @payment_type = @result['PaymentType'] #支付方式
      @respond_type = @result['RespondType'] #回傳格式
      @paytime = @result['PayTime'] #支付完成時間
      @trade_ip = @result['IP'] #交易 IP
      @escrow_bank = @result['EscrowBank'] #款項保管銀行
      @auth_bank = @result['AuthBank'] #收單金融機構
      @respond_code = @result['RespondCode'] #金融機構回應碼
      @auth = @result['Auth'] #授權碼
      @card6_no = @result['Card6No'] #卡號前六碼
      @card4_no = @result['Card4No'] #卡號末四碼
      @payment_method = @result['PaymentMethod'] #交易類別
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
