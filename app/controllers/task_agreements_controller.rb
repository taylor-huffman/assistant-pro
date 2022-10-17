class TaskAgreementsController < ApplicationController

    def index
        task_agreements = TaskAgreement.all
        render json: task_agreements
    end

    def show
        task_agreement = TaskAgreement.find(params[:id])
        render json: task_agreement
    end

end
