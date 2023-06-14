class AssistantTasksController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        assistant_tasks = AssistantTask.all
        render json: assistant_tasks
    end

    def create
        assistant_task = AssistantTask.create!(assistant_task_params)
        render json: assistant_task
    end

    def update
        assistant_task = AssistantTask.find(params[:id])
        assistant_task.update!(assistant_task_params)
        render json: assistant_task
    end

    private

    def assistant_task_params
        params.permit(:assistant_id, :task_category_id)
    end

    def render_unprocessable_entity(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
