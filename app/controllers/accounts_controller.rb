class AccountsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        accounts = Account.all.with_attached_image
        render json: accounts
        # , include: ['employer', 'employer.task_posts']
    end

    def show
        account = Account.find_by(id: session[:account_id])
        if account
            render json: account, include: ['assistant', 'assistant.task_agreements', 'assistant.task_agreements.task_category', 'assistant.task_agreements.employer', 'employer', 'employer.task_posts', 'employer.task_posts.task_post_category', 'employer.task_posts.task_category', 'employer.task_agreements', 'employer.task_agreements.task_category', 'employer.reviews.task_post', 'employer.reviews.assistant', 'employer.assistants', 'employer.assistants.account']
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end 
    end

    def create
        account = Account.create!(account_params)
        session[:account_id] = account.id
        render json: account, include: ['assistant', 'assistant.task_agreements', 'employer', 'employer.task_posts', 'employer.task_agreements', 'employer.assistants']
    end

    def update
        current_user = Account.find(session[:account_id])
        account = Account.find(params[:id])
        if current_user.id == account.id
            account.update!(account_params)
            render json: account, include: ['assistant', 'assistant.task_agreements', 'employer', 'employer.task_posts', 'employer.task_agreements', 'employer.assistants']
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        current_user = Account.find(session[:account_id])
        account = Account.find(params[:id])
        if current_user.id == account.id
            account.destroy
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

    def account_params
        params.permit(:name, :address, :phone, :email, :password, :password_confirmation, :image)
    end

    # def current_user
    #     @current_user ||= Account.find(session[:account_id])
    # end

end
