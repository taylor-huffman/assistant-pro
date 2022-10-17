class AccountsController < ApplicationController

    def index
        accounts = Account.all
        render json: accounts
        # , include: ['employer', 'employer.task_posts']
    end

    def show
        account = Account.find(params[:id])
        render json: account
        # , include: ['assistant', 'assistant.task_agreements', 'employer', 'employer.task_posts', 'employer.task_agreements', 'employer.assistants']
    end

end
