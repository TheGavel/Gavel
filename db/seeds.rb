require 'faker'
require 'open-uri'

json = {
  "3c": {
    "iphone": ["iphone11"],
    "android": ["oppo", "samsung"],
  },
  "運動": { "跑步機": ["喬山", "強生"] },
}

def aaa(jsonn)
  sample = jsonn.keys.sample
  @category_path.push( sample.to_s )
  if jsonn[sample].kind_of?(Array)
    @category_path.push( jsonn[sample].sample )
  else
    aaa(jsonn[sample])
  end
end


ActiveStorage::Attachment.all.each { |attachment| attachment.purge }
Room.all.delete_all
ProductsTag.all.delete_all
Product.all.delete_all

Tag.all.delete_all
User.all.delete_all



### TAG
Tag.create([{ name: '3c' }, { name: '手機' }, { name: 'iphone' }, { name: 'oppo' }, { name: 'samsung' }, { name: '運動' }, { name: '跑步機' }, { name: '喬山' }, { name: '強生' }, { name: 'iphone11' }, { name: 'android' }])

### USER
def user_img(slug)
  {io: open("https://robohash.org/#{slug}") , filename: slug+"_images.jpg"}
end
seller1 = User.create( email: "aaa@aaa",password: "aaaaaa" ,password_confirmation: "aaaaaa" ,username: Faker::Name.name ,role: "seller" )
seller1.avatar.attach(user_img(seller1.id.to_s))

seller2 = User.create( email: "bbb@bbb",password: "bbbbbb" ,password_confirmation: "bbbbbb" ,username: Faker::Name.name ,role: "seller" )
seller2.avatar.attach(user_img(seller2.id.to_s))

seller3 = User.create( email: "ccc@ccc",password: "cccccc" ,password_confirmation: "cccccc" ,username: Faker::Name.name ,role: "seller" )
seller3.avatar.attach(user_img(seller3.id.to_s))
seller = [seller1,seller2,seller3]

10.times do
  ### PRODUCT
  def product_img(width,height,count,id)
    {io: open("https://loremflickr.com/#{width}/#{height}") , filename: id.to_s+"_images.jpg"}
  end
  user = seller.sample
  product = Product.create( name: Faker::Lorem.sentence(word_count: 2),
                            description: Faker::Lorem.sentence(word_count: 10),
                            status: %w[待拍賣 立即競標].sample,
                            start_price: rand(100..500) ,
                            direct_price: rand(1000..10000),
                            user_id: user.id
                            )
  @category_path = []
  aaa(json)
  @category_path.each { |item|
    tag_id = Tag.find_by(name: item).id
    ProductsTag.create(product_id: product.id, tag_id: tag_id)
  }
  3.times do
    product.images.attach(product_img(600,350,3,product.id))
  end

  #ROOM
  Room.create(start_time: Time.now,
              end_time: Faker::Time.between_dates(from: Date.today+1, to: Date.today + 30, period: :all),
              product_id: product.id,
              id: product.id,
              status: %w[未開賣 開賣中 結束競標].sample,
              maxpeople: rand(10..100))
end
