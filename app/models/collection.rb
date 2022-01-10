class Collection < ApplicationRecord
  belongs_to :user
  has_many :cards, dependent: :destroy
  has_many :collection_comments, dependent: :destroy
end
