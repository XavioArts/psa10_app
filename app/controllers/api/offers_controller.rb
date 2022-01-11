class Api::OffersController < ApplicationController
  before_action :set_offer, only: [:show, :destroy, :update]

  def index
    render json: Offer.all
  end

  def show
    render json: @offer
  end

  def create
    @offer = offers.new(offer_params)
    if @offer.save
      render json: @offer
    else
      render json: {error: @offer.errors}, status: 422
    end
  end

  def update
    if @offer.update(offer_params)
      render json: @offer
    else
      render json: {error: @offer.errors}, status: 422
    end
  end

  def destroy
    render json: @offer.destroy
  end

  private

  def set_offer
    @offer = current_user.offers.find(params[:id])
  end

  def offer_params
    params.require(:offer).permit(:sale_offer, :trade_offer, :seen, :accepted, :counter_offer)
  end


end
