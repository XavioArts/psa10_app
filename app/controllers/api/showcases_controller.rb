class Api::ShowcasesController < ApplicationController
  before_action :set_showcase, only: [:show, :destroy, :update]

  def index
    render json: Showcase.all
  end

  def show
    render json: @showcase
  end

  def showcases
    render json: Showcase.user_showcases(params[:id])
  end

  def create
    @showcase = Showcase.new(showcase_params)
    if @showcase.save
      render json: @showcase
    else
      render json: {error: @showcase.errors}, status: 422
    end
  end

  def update
    if @showcase.update(showcase_params)
      render json: @showcase
    else
      render json: {error: @showcase.errors}, status: 422
    end
  end

  def card 
    binding.pry
    @showcase.cards << params[:id].to_i
    @showcase.save 
  end

  def destroy
    render json: @showcase.destroy
  end

  private

  def set_showcase
    @showcase = Showcase.find(params[:id])
  end

  def showcase_params
    params.require(:showcase).permit(:name, :description, :cards, :user_id)
  end

end
