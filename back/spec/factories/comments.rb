FactoryBot.define do
  factory :comment do
    association :user
    association :board
    comment { "test comment" }
  end
end
