class AddLikedCollectionsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :liked_collections, :string, default: ""
  end
end
