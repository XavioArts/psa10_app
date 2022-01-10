class Card < ApplicationRecord
  belongs_to :user
  belongs_to :collection
  has_many :offers, dependent: :destroy
  has_many :card_comments, dependent: :destroy
end
