class Showcase < ApplicationRecord
  belongs_to :user

  serialize :cards, Array

  def self.cards(ids)
    ids = ids.empty? ? [0] : ids
    Card.where("id IN (?)", ids)
  end

# SELECT showcases.id AS showcase_id, showcases.name, description, user_id, cards, u.id FROM showcases
# INNER JOIN users AS u ON showcases.user_id = u.id;

# SELECT showcases.id AS showcase_id, showcases.name, description, showcases.user_id AS showcase_user_id, cards, u.id, c.id AS card_id, c.name AS card_name, c.condition, c.available, c.front_image, c.back_image, c.likes, c.category, c.grade, c.graded, c.card_number, c.showcase FROM showcases
# INNER JOIN users AS u ON showcases.user_id = u.id
# INNER JOIN cards AS c ON showcases.user_id = c.user_id;

def self.user_showcases(id)
  select("showcases.id AS showcase_id, showcases.name, description, showcases.user_id AS showcase_user_id, cards, u.id, c.id AS card_id, c.user_id AS card_user_id, c.name AS card_name, c.condition, c.available, c.front_image, c.back_image, c.likes, c.category, c.grade, c.graded, c.card_number")
  .joins("INNER JOIN users AS u ON showcases.user_id = u.id
  INNER JOIN cards AS c ON showcases.user_id = c.user_id")
  .where('showcases.user_id = ?', id)
end

end

