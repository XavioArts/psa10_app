class CreateShowcases < ActiveRecord::Migration[6.1]
  def change
    create_table :showcases do |t|
      t.string :name, default: ""
      t.text :description, default: ""
      t.string :cards, default: ""
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
