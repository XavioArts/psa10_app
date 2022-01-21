class Message < ApplicationRecord
  belongs_to :user
  belongs_to :topic

  # SELECT messages.id, u.nickname, messages.user_id, messages.topic_id, content, messages.created_at, messages.updated_at
  # FROM messages
  # INNER JOIN users AS u ON u.id = messages.user_id
  # WHERE topic_id = 19
  # ORDER BY created_at desc

  def self.messages_plus(topic_id, message_id)
    select('messages.id, u.nickname AS user_nickname, user_id, topic_id, content, messages.created_at, messages.updated_at')
    .joins('INNER JOIN users AS u ON u.id = messages.user_id')
    .where("topic_id = ? AND messages.id = ?", topic_id, message_id)
    .order('created_at desc')
  end
end
