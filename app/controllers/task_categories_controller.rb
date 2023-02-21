class TaskCategoriesController < ApplicationController

    def index
        task_categories = TaskCategory.all
        render json: task_categories
    end

    def show
        task_categories = TaskCategory.find(params[:id])
        render json: task_categories
    end

end
