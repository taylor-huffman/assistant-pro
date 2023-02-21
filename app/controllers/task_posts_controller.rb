class TaskPostsController < ApplicationController

    def index
        task_posts = TaskPost.all
        render json: task_posts
    end

    def show
        task_post = TaskPost.find(params[:id])
        render json: task_post
    end

    def create
        task_post = TaskPost.create!(user_params)
        render json: task_post
    end

    def update
        task_post = TaskPost.find(params[:id])
        task_post.update!(
            task_description: params[:task_description],
            hourly_rate: params[:hourly_rate],
            is_active: params[:is_active]
        )
        render json: task_post
    end

    def destroy
        task_post = TaskPost.find(params[:id])
        task_post.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:employer_id, :task_description, :hourly_rate, :is_active)
    end

end
