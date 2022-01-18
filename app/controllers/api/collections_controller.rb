class Api::CollectionsController < ApplicationController

    before_action :authenticate_user!, except: [:all_collections]
    before_action :set_collection, only: [:destroy, :update, :show]
    before_action :set_user, only: [:user_collections]

    def index
        render json: current_user.collections, include: [:cards]
    end

    def all_collections
        render json: Collection.all
    end

    def user_collections
        render json: @user.collections, include: [:cards]
    end

    def show
        render json: @collection, include: [:cards]
    end

    def create
        @collection = current_user.collections.new(collection_params)
        if @collection.save
            render json: @collection 
        else
            render json: {errors: @collection.errors}, status: 422
        end
    end

    def update
        if @collection.update(collection_params)
            render json: @collection
        else
            render json: {errors: @collection.errors}, status: 422
        end
    end

    def destroy
        render json: @collection.destroy
    end

    private

    def collection_params
        params.require(:collection).permit(:category, :name, :description, :likes, :user_id)
    end

    def set_collection
        @collection = Collection.find(params[:id])
    end
    def set_user
        @user = User.find(params[:id])
    end

end
