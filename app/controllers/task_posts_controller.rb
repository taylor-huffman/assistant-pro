class TaskPostsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    def index
        task_posts = TaskPost.all
        render json: task_posts
    end

    def show
        task_post = TaskPost.find(params[:id])
        render json: task_post
    end

    def create
        current_user = Account.find(session[:account_id])
        task_post = current_user.employer.task_posts.create!(task_post_params)
        render json: task_post
    end

    def update
        current_user = Account.find(session[:account_id])
        task_post = current_user.employer.task_posts.find(params[:id])
        if task_post.id == params[:id].to_i
            task_post.update!(task_post_params)
            render json: task_post
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        current_user = Account.find(session[:account_id])
        task_post = current_user.employer.task_posts.find(params[:id])
        if task_post.id == params[:id].to_i
            task_post.destroy
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

    def task_post_params
        params.permit(:employer_id, :task_description, :hourly_rate, :is_active)
    end

end
