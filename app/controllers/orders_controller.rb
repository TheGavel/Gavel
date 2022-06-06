class OrdersController < ApplicationController
  protect_from_forgery
  skip_before_action :require_login


  def buyer_order
    @orders = current_user&.buyer_orders
  end

  def seller_order
    @orders = current_user&.seller_orders
  end

  def buy
    redirect_to check_order_path(params[:id].to_i)
  end

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
      redirect_to buyer_order_orders_path, notice: '已付款成功'
    else
      order.fail!
      redirect_to buyer_order_orders_path, alert: '付款失敗'
    end
  end
end
