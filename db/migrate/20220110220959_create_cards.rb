class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.float :price
      t.text :description
      t.string :condition
      t.boolean :sale
      t.boolean :trade
      t.string :front_image
      t.string :back_image
      t.integer :likes
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
