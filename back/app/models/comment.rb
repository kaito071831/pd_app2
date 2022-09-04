class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :board

  validates :name, length: { maximum: 100 }
  validates :comment, presence: true, length: { maximum: 65535 }
end
