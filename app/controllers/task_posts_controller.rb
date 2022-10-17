class TaskPostsController < ApplicationController

    def index
        task_posts = TaskPost.all
        render json: task_posts
    end

    def show
        task_post = TaskPost.find(params[:id])
        render json: task_post
    end

end
