class AddCoverImageToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :cover_image, :string, default: "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
  end
end
