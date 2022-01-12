class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :condition
      t.boolean :available
      t.string :front_image
      t.string :back_image
      t.integer :likes
      t.string :category
      t.boolean :graded
      t.float :grade
      t.string :set
      t.integer :year
      t.string :card_number
      t.boolean :showcase
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
