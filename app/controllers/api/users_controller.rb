class Api::UsersController < ApplicationController

    before_action :authenticate_user!

    def profile_image
        file = params[:file]

        if file
            begin
                puts "saving to cloudinary"
                cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
            rescue => e
                puts "error occurred"
                p e
                render json: {errors: e}, status: 422
                return
            end
        end

        if cloud_image && cloud_image['secure_url']
            current_user.image = cloud_image['secure_url']
        end

        if current_user.save
            render json: current_user
        else
            render json: {errors: e}, status: 422
        end
    end

end
