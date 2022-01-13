class CreateShowcases < ActiveRecord::Migration[6.1]
  def change
    create_table :showcases do |t|
      t.string :name
      t.text :description
      t.string :cards
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
