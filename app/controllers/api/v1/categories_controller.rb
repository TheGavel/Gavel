class Api::V1::CategoriesController < Api::V1::BaseController
  def show
    #includes
    # products_json = Tag.find_by(name: params[:id]).products_tags

    # products = Product.all.to_json#Tag.find_by(name: params[:id]).products#.includes(:products_tags)
    pp = Product.all
    pro = pp.as_json
    pro.each_with_index do |product,idx|
      product[:image] = url_for( pp[idx].images[0] )
    end

    render json: pro
  end
end
# images_attachments
