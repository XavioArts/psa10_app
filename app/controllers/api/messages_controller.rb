class Api::MessagesController < ApplicationController

    # before_action :authenticate_user!, only: [:create, :update]
    before_action :set_topic
    before_action :set_message, only: [:show, :update, :destroy]

    def index
        render json: @topic.messages
    end

    def show
        render json: @message
    end

    def create
        @message = @topic.messages.new(message_params)
        if @message.save
            render json: @message
        else
            render json: {errors: @message.errors}, status: 422
        end
    end

    def update
        if @message.update(message_params)
            render json: @message
        else
            render json: {errors: @message.errors}, status: 422
        end
    end

    def destroy
        render json: @message.destroy
    end

    private

    def message_params
        params.require(:message).permit(:content, :topic_id, :user_id)
    end

    def set_topic
        @topic = Topic.find(params[:topic_id])
    end

    def set_message
        @message = @topic.messages.find(params[:id])
    end

end
