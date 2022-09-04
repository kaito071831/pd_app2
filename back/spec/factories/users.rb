FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@example.com" }
    nickname { email }
    password { "password" }
    password_confirmation { "password" }
    confirmed_at { Date.current }
  end
end
