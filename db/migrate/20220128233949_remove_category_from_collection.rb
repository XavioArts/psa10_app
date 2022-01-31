class RemoveCategoryFromCollection < ActiveRecord::Migration[6.1]
  def change
    remove_column :collections, :category, :string
  end
end
