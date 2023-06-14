class TaskPostCategoriesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    def index
        task_post_categories = TaskPostCategory.all
        render json: task_post_categories
    end

    def show
        task_post_categories = TaskPostCategory.find(params[:id])
        render json: task_post_categories
    end

    def create
        task_post_categories = TaskPostCategory.create!(task_post_category_params)
        render json: task_post_categories
    end

    def update
        task_post_category = TaskPostCategory.find(params[:id])
        task_post_category.update!(task_post_category_params)
        render json: task_post_category
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

    def task_post_category_params
        params.permit(:task_post_id, :task_category_id)
    end

end
