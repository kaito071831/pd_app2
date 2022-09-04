class Board < ApplicationRecord
  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 100 }
end
