class AccountsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        accounts = Account.all
        render json: accounts
        # , include: ['employer', 'employer.task_posts']
    end

    def show
        account = Account.find(session[:account_id])
        render json: account, include: ['assistant', 'assistant.task_agreements', 'employer', 'employer.task_posts', 'employer.task_agreements', 'employer.assistants']
    end

    def create
        account = Account.create!(user_params)
        render json: account, include: ['assistant', 'assistant.task_agreements', 'employer', 'employer.task_posts', 'employer.task_agreements', 'employer.assistants']
    end

    private

    def render_unprocessable_entity
        render json: { error: invalid.record.errors }, status: :unprocessable_entity
    end

    def user_params
        params.permit(:name, :address, :phone, :email, :password)
    end

end
