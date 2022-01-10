class Api::CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_card, only: [:show, :destroy, :update]

  def all_cards
    render json: Card.all
  end

  def index 
    render json: current_user.cards
  end

  def show
    render json: @Card
  end

  def create
    @card = current_user.cards.new(card_params)
    if @card.save
      render json: @card
    else 
      render json: {error: @card.errors}, status: 422
    end
  end

  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: {error: @card.errors}, status: 422
    end
  end

  def destroy
    render json: @card.destroy
  end

  private

  def set_card
    @card = current_user.cards.find(params[:id, :user_id, :collection_id])
  end

  def card_params
    params.requre(:card).permit(:name, :price, :description, :condition, :sale, :trade, :likes, :front_image, :back_image )
  end

end