class CreateOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :offers do |t|
      t.float :sale_offer
      t.integer :trade_offer
      t.boolean :seen
      t.boolean :accepted
      t.boolean :counter_offer
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
