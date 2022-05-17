class OrdersController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :require_login, only: %i[notify_response]

  def payment
    order = Order.find(params[:id])
    @form_info = Newebpay::Mpg.new(order).form_info
    @MerchantID = @form_info[:MerchantID]
    @TradeInfo = @form_info[:TradeInfo]
    @TradeSha = @form_info[:TradeSha]
    @Version = @form_info[:Version]
  end

  def notify_response
    response = Newebpay::Mpgresponse.new(params[:TradeInfo])
    render html: response.result
  end

end
