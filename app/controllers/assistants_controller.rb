class AssistantsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        assistants = Assistant.all
        render json: assistants
    end

    def show
        assistant = Assistant.find(params[:id])
        render json: assistant
    end

    def create
        assistant = Assistant.create!(user_params)
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

    def destroy
        assistant = Assistant.find(params[:id])
        assistant.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:company_name, :company_bio, :company_start_date, :company_hourly_rate, :account_id)
    end

    def render_unprocessable_entity(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
