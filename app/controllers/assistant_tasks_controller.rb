class AssistantTasksController < ApplicationController

    def index
        assistant_tasks = AssistantTask.all
        render json: assistant_tasks
    end

end
