class TaskAgreementsController < ApplicationController

    def index
        task_agreements = TaskAgreement.all
        render json: task_agreements
    end

    def create
        task_agreement = TaskAgreement.create!(task_agreement_params)
        render json: task_agreement
    end

    def show
        task_agreement = TaskAgreement.find(params[:id])
        render json: task_agreement
    end

    def update
        task_agreement = TaskAgreement.find(params[:id])
        task_agreement.update(
            task_agreement_notes: params[:task_agreement_notes],
            hourly_rate: params[:hourly_rate],
            is_completed: params[:is_completed]
        )
        render json: task_agreement
    end

    def destroy
        task_agreement = TaskAgreement.find(params[:id])
        task_agreement.destroy
        head :no_content
    end

    private

    def task_agreement_params
        params.permit(:assistant_id, :employer_id, :hourly_rate, :is_completed, :task_agreement_notes, :task_post_id)
    end

end
