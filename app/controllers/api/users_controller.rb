class Api::UsersController < ApplicationController
before_action :authenticate_user!, except: [:index, :search, :show]
before_action :set_user, only: [:show, :update, :destroy, :info]
before_action :liked_collection_params, only: [:update_collection_likes]

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

    def cover_image
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
          current_user.cover_image = cloud_image['secure_url']
      end

      if current_user.save
          render json: current_user
      else
          render json: {errors: e}, status: 422
      end
  end

  def index
    other_users = User.all
    render json: other_users
  end

  def search 
    phrase = params[:search]
    render json: User.search(phrase)
  end

  def show
    render json: @user
  end

  def info
    render json: @user
  end

  # def create
  #   @user = User.new(user_params)

  #   if (@user.save)
  #     render json: @user
  #   else
  #     render json: {error: @user.errors}, status: 422
  #   end
  # end

  def update
    if (@user.update(user_params))
      render json: @user
    end
  end

  def update_collection_likes
    if (current_user.update(liked_collection_params))
      render json: current_user
    end
  end

  def destroy
    @user.destroy
    render json: @user
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :password, :image, :nickname, :first_name, :last_name, :about, :primary_showcase, :cover_image)
    end

    def liked_collection_params
      params.require(:user).permit({:liked_collections => []})
    end
end
