class Api::CardsController < ApplicationController
  before_action :authenticate_user!, except: [:card_search]
  before_action :set_card, only: [:show, :destroy, :update, :upload]


  def index 
    render json: current_user.cards
  end

  def card_search
    @user = User.find(params[:id])
    phrase = params[:search]
    render json: @user.card_search(phrase)
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
    @card = Card.new(card_params)
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
    @card = Card.find(params[:id])
  end

  def card_params
    params.require(:card).permit(:name, :category, :condition, :available, :set, :likes, :front_image, :back_image, :graded, :grade, :year, :card_number, :user_id, :collection_id, :showcase)
  end

end
