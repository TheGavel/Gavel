FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email}
    username { Faker::Name.name }
    password { Faker::Internet.password }
    password_confirmation { password }
    phone { Faker::PhoneNumber.cell_phone_in_e164 }

  end
end
