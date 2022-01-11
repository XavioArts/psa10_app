class Api::CollectionCommentsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_collection
  before_action :set_collection_comment, only: [:show, :update, :destroy]

  def index
    render json: @collection.collection_comments
  end

  def show
    render json: @collection_comment
  end

  def create
    @collection_comment = @collection.collection_comments.new(collection_comment_params)
    if(@collection_comment.save)
      render json: @collection_comment
    else
      render json: {errors: @collection_comment.errors}, status: 422
    end
  end

  def update
    if(@collection_comment.update(collection_comment_params))
      render json: @collection_comment
    else
      render json: {errors: @collection_comment.errors}, status: 422
    end
  end

  def destroy
    render json: @collection_comment.destroy
  end

  private

  def collection_comment_params
    params.require(:collection_comment).permit(:content, :user_id, :collection_id)
  end

  def set_collection
    @collection = Collection.find(params[:collection_id])
  end

  def set_collection_comment
    @collection_comment = @collection.collection_comments.find(params[:id])
  end
end
