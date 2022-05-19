class Api::V1::CategoriesController < Api::V1::BaseController
  def show
    #includes

    # products_json = Tag.find_by(name: params[:id]).products_tags
    products_json = Tag.find_by(name: params[:id]).products#.includes(:products_tags)
    products_json.each do |item|
      p item.images
    end
    p products_json
    render json: products_json
  end
end
# images_attachments
