class AddCoverImageToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :cover_image, :string, default: "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643339571/Prowler%20006.jpg.jpg" 
  end
end
