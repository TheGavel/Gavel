class OrdersController < ApplicationController
  protect_from_forgery
  skip_before_action :require_login, only: %i[return_response]

  def check
    @order = Order.find(params[:id])
    @form_info = Newebpay::Mpg.new(@order).form_info
    @MerchantID = @form_info[:MerchantID]
    @TradeInfo = @form_info[:TradeInfo]
    @TradeSha = @form_info[:TradeSha]
    @Version = @form_info[:Version]
  end

  def return_response
    response = Newebpay::Mpgresponse.new(params[:TradeInfo])
    order= Order.find(response.result["MerchantOrderNo"])
    if response.status == "SUCCESS"
      order.pay!
      redirect_to own_products_path , notice: "已付款成功"
    else
      order.fail!
      redirect_to own_products_path , alert: "付款失敗"
    end
  end
end
