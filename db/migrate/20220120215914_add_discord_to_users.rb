class AddDiscordToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :twitter, :string, default: ""
    add_column :users, :discord, :string, default: ""
    add_column :users, :facebook, :string, default: ""
    add_column :users, :instagram, :string, default: ""
  end
end
