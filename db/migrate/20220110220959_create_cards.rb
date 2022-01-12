class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name, default: ""
      t.string :condition, default: ""
      t.boolean :available, default: false
      t.string :front_image, default: ""
      t.string :back_image, default: ""
      t.integer :likes, default: 0
      t.string :category, default: ""
      t.boolean :graded, default: ""
      t.float :grade
      t.string :set, default: ""
      t.integer :year
      t.string :card_number, default: ""
      t.boolean :showcase, default: false
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
