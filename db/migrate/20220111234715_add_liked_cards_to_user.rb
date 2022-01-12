class AddLikedCardsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :liked_cards, :string, default: ""
  end
end
