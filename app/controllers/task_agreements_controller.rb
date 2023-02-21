class TaskAgreementsController < ApplicationController

    def index
        task_agreements = TaskAgreement.all
        render json: task_agreements
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

end
