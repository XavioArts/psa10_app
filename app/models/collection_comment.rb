class CollectionComment < ApplicationRecord
  belongs_to :collection
  belongs_to :user

  # custom SQL to get user nickname, join user table
  # Select collection_comments.id as collection_comments_id, collection_comments.content, collection_id, user_id, image, nickname 
  # FROM collection_comments
  # inner join users as u on u.id = collection_comments.user_id
  def self.userInfo
    select("collection_comments.id, collection_comments.content, collection_id, user_id, image, nickname")
    .joins("inner join users as u on u.id = collection_comments.user_id")
    # .order('created_at desc')
  end
end
