class AssistantsController < ApplicationController

    def index
        assistants = Assistant.all
        render json: assistants, include: [:reviews]
    end

    def show
        assistant = Assistant.find(params[:id])
        render json: assistant
    end

    def update
        assistant = Assistant.find(params[:id])
        assistant.update(
            company_name: params[:company_name],
            company_bio: params[:company_bio],
            company_start_date: params[:company_start_date],
            company_hourly_rate: params[:company_hourly_rate]
        )
        render json: assistant
    end

end
