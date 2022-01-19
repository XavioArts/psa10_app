class Showcase < ApplicationRecord
  belongs_to :user

  serialize :cards, Array

  def self.cards(ids)
    ids = ids.empty? ? [0] : ids
    Card.where("id IN (?)", ids)
  end

# SELECT showcases.id AS showcase_id, showcases.name, description, user_id, cards, u.id FROM showcases
# INNER JOIN users AS u ON showcases.user_id = u.id;

def self.user_showcases(id)
  select("showcases.id AS showcase_id, showcases.name, description, user_id, cards, u.id")
  .joins("INNER JOIN users AS u ON showcases.user_id = u.id")
  .where('user_id = ?', id)
end



end

