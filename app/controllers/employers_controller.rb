class EmployersController < ApplicationController

    def index
        employers = Employer.all
        render json: employers
    end

    def show
        employer = Employer.find(params[:id])
        render json: employer
        # , include: ['task_posts', 'task_agreements', 'assistants', 'reviews', 'reviews.task_agreement']
    end

end
