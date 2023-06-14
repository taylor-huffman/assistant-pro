class AssistantsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    def index
        assistants = Assistant.all
        render json: assistants
    end

    def show
        assistant = Assistant.find(params[:id])
        render json: assistant
    end

    def create
        current_user = Account.find(session[:account_id])
        assistant = current_user.create_assistant!(assistant_params)
        render json: assistant
    end

    def update
        current_user = Account.find(session[:account_id])
        assistant = current_user.assistant
        if assistant.id == params[:id].to_i
            assistant.update!(assistant_params)
            render json: assistant
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        current_user = Account.find(session[:account_id])
        assistant = current_user.assistant
        if assistant.id == params[:id].to_i
            assistant.destroy
            head :no_content
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    private

    def assistant_params
        params.permit(:company_name, :company_bio, :company_start_date, :company_hourly_rate, :account_id)
    end

    def render_unprocessable_entity(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response(error)
        render json: { error: [error.message] }, status: :not_found
    end

    # def current_user
    #     @current_user ||= Account.find(session[:account_id])
    # end
    
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :account_id
    end

end
