class AssistantsController < ApplicationController

    def index
        assistants = Assistant.all
        render json: assistants, include: [:reviews]
    end

    def show
        assistant = Assistant.find(params[:id])
        render json: assistant
    end

end
