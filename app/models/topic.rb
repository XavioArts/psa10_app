class Topic < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy

  # SELECT topics.id, title, body, user_id, topics.created_at, topics.updated_at, u.nickname AS user_nickname
  # FROM  topics
  # INNER JOIN users AS u ON u.id = topics.user_id
  # ORDER BY created_at desc

  def self.topics_plus
    select('topics.id, title, body, user_id, topics.created_at, topics.updated_at, u.nickname AS user_nickname')
    .joins('INNER JOIN users AS u ON u.id = topics.user_id')
    .order('created_at desc')
  end

end
