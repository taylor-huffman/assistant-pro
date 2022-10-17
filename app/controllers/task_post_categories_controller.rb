class TaskPostCategoriesController < ApplicationController

    def index
        task_post_categories = TaskPostCategory.all
        render json: task_post_categories
    end

end
