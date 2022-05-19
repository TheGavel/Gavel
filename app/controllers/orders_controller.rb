class OrdersController < ApplicationController
  protect_from_forgery only: :return_response
  skip_before_action :require_login, only: %i[return_response]

  def checkout
    @order = Order.find(params[:id])
    @form_info = Newebpay::Mpg.new(@order).form_info
    @MerchantID = @form_info[:MerchantID]
    @TradeInfo = @form_info[:TradeInfo]
    @TradeSha = @form_info[:TradeSha]
    @Version = @form_info[:Version]
  end

  def return_response
    response = Newebpay::Mpgresponse.new(params[:TradeInfo])
    order= Order.last
    if response.status == "SUCCESS"
      order.pay!
      redirect_to own_products_path , notice: "已付款成功"
    end
  end
end
