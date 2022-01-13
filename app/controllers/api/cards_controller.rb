class Api::CardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_card, only: [:show, :destroy, :update, :upload]


  def index 
    render json: current_user.cards
  end

  def all_cards
    render json: Card.all
  end

  def upload
    fileFront = params[:fileFront]
    fileBack = params[:fileBack]

        if fileFront && fileBack
            begin
                puts "saving to cloudinary"
                cloud_image_front = Cloudinary::Uploader.upload(fileFront, public_id: fileFront.original_filename, secure: true, resource_type: :auto)
                cloud_image_back = Cloudinary::Uploader.upload(fileBack, public_id: fileBack.original_filename, secure: true, resource_type: :auto)
            rescue => e
                puts "error occurred"
                p e
                render json: {errors: e}, status: 422
                return
            end
        end

        if cloud_image_front && cloud_image_front['secure_url']
            @card.front_image = cloud_image_front['secure_url']
        end
        if cloud_image_back && cloud_image_back['secure_url']
            @card.back_image = cloud_image_back['secure_url']
        end

        if @card.save
            render json: @card
        else
            render json: {errors: e}, status: 422
        end
  end

  def show
    render json: @card
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
    @card = current_user.cards.find(params[:id])
  end

  def card_params
    params.requre(:card).permit(:available, :category, :front_image, :likes, :back_image, :name, :condition, :graded, :grade, :set, :year, :card_number)
  end

end
