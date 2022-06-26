FactoryBot.define do
  factory :product do
    association :user, factory: :user
    name { Faker::Device.manufacturer }
    description { Faker::Lorem.characters(number: 10) }
    status { "draft" }
    start_price {Faker::Number.within(range: 1000..10000)}
    basicprice {Faker::Number.within(range: 10..50)}
  end
end
