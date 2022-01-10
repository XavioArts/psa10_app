class CreateCollectionComments < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_comments do |t|
      t.text :content
      t.belongs_to :collection, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
