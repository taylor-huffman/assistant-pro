class TaskAgreementsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]


    def index
        task_agreements = TaskAgreement.all
        render json: task_agreements
    end

    def create
        current_user = Account.find(session[:account_id])
        task_agreement = current_user.employer.task_agreements.create!(task_agreement_params)
        render json: task_agreement, include: ['assistant', 'assistant.account']
    end

    def show
        task_agreement = TaskAgreement.find(params[:id])
        render json: task_agreement
    end

    def update
        current_user = Account.find(session[:account_id])
        task_agreement = current_user.employer.task_agreements.find(params[:id])
        if task_agreement.id == params[:id].to_i
            task_agreement.update!(task_agreement_params)
            render json: task_agreement
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        current_user = Account.find(session[:account_id])
        task_agreement = current_user.employer.task_agreements.find(params[:id])
        if task_agreement.id == params[:id].to_i
            task_agreement.destroy
            head :no_content
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    private

    def render_unprocessable_entity(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response(error)
        render json: { error: [error.message] }, status: :not_found
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :account_id
    end

    def task_agreement_params
        params.permit(:assistant_id, :employer_id, :hourly_rate, :is_completed, :task_agreement_notes, :task_post_id)
    end

end
