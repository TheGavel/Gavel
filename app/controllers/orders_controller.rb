class OrdersController < ApplicationController
  def payment
    order = Order.find(params[:id])
    @form_info = Newebpay::Mpg.new(order).form_info
    @MerchantID = @form_info[:MerchantID]
    @TradeInfo = @form_info[:TradeInfo]
    @TradeSha = @form_info[:TradeSha]
    @Version = @form_info[:Version]
  end
end
