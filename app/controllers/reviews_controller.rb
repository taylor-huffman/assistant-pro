class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    def index
        reviews = Review.all
        render json: reviews, include: ['assistant', 'assistant.account', 'employer', 'task_agreement', 'task_post']
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        current_user = Account.find(session[:account_id])
        review = current_user.employer.task_agreements.find(params[:task_agreement_id]).create_review!(review_params)
        render json: review
    end

    def update
        current_user = Account.find(session[:account_id])
        review = current_user.employer.task_agreements.find(params[:task_agreement][:id]).review
        if review.id == params[:id].to_i
            review.update!(review_params)
            render json: review
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        current_user = Account.find(session[:account_id])
        review = current_user.employer.task_agreements.find(params[:task_agreement][:id]).review
        if review.id == params[:id].to_i
            review.destroy
            head :no_content
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    private

    def review_params
        params.permit(:rating, :task_agreement_id, :review_text, :employer_id, :assistant_id)
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
