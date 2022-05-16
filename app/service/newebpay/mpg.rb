module Newebpay
  class Mpg
    include Rails.application.routes.url_helpers
    attr_accessor :info

    def initialize(params)
      @key = ENV['NEWEBPAY_KEY']
      @iv = ENV['NEWEBPAY_IV']
      @merchant_id = ENV['NEWEBPAY_MERCHANT_ID']
      @info = {}  # 使用 attr_accessor 讓 info 方便存取
      set_info(params)
    end

    def form_info
      {
        MerchantID: @merchant_id,
        TradeInfo: trade_info,
        TradeSha: trade_sha,
        Version: "2.0"
      }
    end

    private

    def trade_info
      aes_encode(url_encoded_query_string)
    end

    def trade_sha
      sha256_encode(@key, @iv, trade_info)
    end

    def set_info(order)
      info[:MerchantID] = @merchant_id
      info[:MerchantOrderNo] = order.id
      info[:Amt] = order.price
      info[:ItemDesc] = order.description
      info[:Email] = order.email
      info[:TimeStamp] = Time.now.to_i
      info[:RespondType] = "JSON"
      info[:Version] = "2.0"
      info[:ReturnURL] = ""
      info[:NotifyURL] = ""
      info[:LoginType] = 0
      info[:CREDIT] =  1
      info[:VACC] = 1
      info[:TradeLimit] = "300"
    end

    def url_encoded_query_string
      URI.encode_www_form(info)
    end

    def aes_encode(string)
      cipher = OpenSSL::Cipher::AES256.new(:CBC)
      cipher.encrypt
      cipher.key = @key
      cipher.iv = @iv
      cipher.padding = 0
      padding_data = add_padding(string)
      encrypted = cipher.update(padding_data) + cipher.final
      encrypted.unpack('H*').first
    end

    def add_padding(data, block_size = 32)
      pad = block_size - (data.length % block_size)
      data + (pad.chr * pad)
    end

    def sha256_encode(key, iv, trade_info)
      encode_string = "HashKey=#{key}&#{trade_info}&HashIV=#{iv}"
      Digest::SHA256.hexdigest(encode_string).upcase
    end

  end
end
