class Api::CardCommentsController < ApplicationController
  before_action :set_card
  before_action :set_card_comment, only: [:show, :update, :destroy]
  
  # currently the index shows all of the comments for one particular card. May need to add a method to show all card comments, if necessary in UI.

  def index
    card_comments = @card.card_comments.all
    render json: card_comments
  end

  def show
    render json: @card_comment
  end

  def create
    @card_comment = @card.card_comments.new(card_comment_params)

    if @card_comment.save
      render json: @card_comment
    else
      render json: {error: @card_comment.errors}, status: 422
    end
  end

  def update
    if (@card_comment.update(card_comment_params))
      render json: @card_comment
    else
      render json: {error: @card_comment.errors}, status: 422
    end
  end

  def destroy
    @card_comment.destroy
    render json: @card_comment
  end

  private
    def set_card
      @card = Card.find(params[:card_id])
    end

    def set_card_comment
      @card_comment = @card.card_comments.find(params[:id])
    end

    def card_comment_params
      params.require(:card_comment).permit(:content, :user_id, :card_id)
    end
end


