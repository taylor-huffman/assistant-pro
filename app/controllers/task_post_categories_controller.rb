class TaskPostCategoriesController < ApplicationController

    def index
        task_post_categories = TaskPostCategory.all
        render json: task_post_categories
    end

    def show
        task_post_categories = TaskPostCategory.find(params[:id])
        render json: task_post_categories
    end

    def create
        task_post_categories = TaskPostCategory.create!(user_params)
        render json: task_post_categories
    end

    def update
        task_post_category = TaskPostCategory.find(params[:id])
        task_post_category.update!(user_params)
        render json: task_post_category
    end

    private

    def user_params
        params.permit(:task_post_id, :task_category_id)
    end

end
