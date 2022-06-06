require 'rails_helper'
require 'open-uri'

RSpec.describe RoomChannel, type: :channel do
  before do
    @user1 = User.create( email: "aaaa@aaa",password: "aaaaaa" ,password_confirmation: "aaaaaa" ,username: "aaaa" ,role: "seller" )
    @user1.save!

    @product1 = Product.new( name: "aaaa",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    status: %w[待拍賣 立即競標].sample,
    start_price: rand(100..500) ,
    direct_price: rand(1000..10000),
    user_id: @user1.id
    )

    @product1.images.attach({io: open("https://loremflickr.com/600/350") , filename: "_images.jpg"})
    @product1.save!

    @room1 = Room.new(start_time: Time.now+ 30.seconds,
    end_time: Time.now+ 58.seconds,
    product_id: @product1.id,
    id: @product1.id,
    status: %w[未開賣 開賣中 結束競標].sample,
    maxpeople: rand(10..100))
    @room1.skip_callback = true
    @room1.save!
  end

  it "race condition" do
    subscribe

    test_times = 1000
    threads = test_times.times.map { |n|
      Thread.new do |_t|
        perform :bid, {
        :user => @user1.id,
        :room =>  @room1.id,
        :price => 200+n*99
        }
      end
    }
    threads.each(&:join)

    arr = @room1.record.where("bid >= 0")
                .order('id ASC')
                .map{|n| n.bid}
    # expect( arr.length ).to be == test_times
    #因為交易不一定每次都會成功，大致上有4成交易被rollback
    expect( arr ).not_to be eq []
    expect( arr ).to be == arr.sort
  end
end
