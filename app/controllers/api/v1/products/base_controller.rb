class Api::V1::Products::BaseController < ApplicationController
  skip_before_action :require_login
  def product_architecture(products)
    products.map{ |product|
      {
        name: product.name,
        description: product.description,
        status: product.status,
        start_price: product.start_price,
        direct_price: product.direct_price,
        seller_image: url_for(product.user.avatar),
        product_image: url_for(product.images[0]),
        label_list: product.tags.map { |tag| tag.name }
      }
    }
  end
end
