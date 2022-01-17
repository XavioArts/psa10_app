class AddCardsToShowcases < ActiveRecord::Migration[6.1]
  def change
    add_column :showcases, :cards, :text
  end
end
