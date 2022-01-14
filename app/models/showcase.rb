class Showcase < ApplicationRecord
  belongs_to :user

  # serialize :cards, Array

  # def self.cards(ids)
  #   ids = ids.empty? ? [0] : ids
  #   Card.where("id IN (?)", ids)
  # end

end
