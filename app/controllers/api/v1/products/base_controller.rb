class Api::V1::Products::BaseController < ApplicationController
  def product_architecture(products)
    products.map{ |product|
      { image: url_for(product.images[0]),
        name: product.name,
        description: product.description,
        status: product.status,
        direct_price: product.direct_price,
        start_price: product.start_price
      }
    }
  end
end
