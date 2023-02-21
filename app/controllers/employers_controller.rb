class EmployersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    # before_action :authorize
    # skip_before_action :authorize, only: [:create, :index]

    def index
        employers = Employer.all
        render json: employers
    end

    def show
        employer = Employer.find(params[:id])
        render json: employer
        # , include: ['task_posts', 'task_agreements', 'assistants', 'reviews', 'reviews.task_agreement']
    end

    def create
        employer = Employer.create!(user_params)
        render json: employer
    end

    def update
        employer = Employer.find(params[:id])
        employer.update(
            company_name: params[:company_name],
            company_bio: params[:company_bio],
            company_start_date: params[:company_start_date]
        )
        render json: employer
    end

    def destroy
        employer = Employer.find(params[:id])
        employer.destroy
        head :no_content
    end


    private

    def render_unprocessable_entity(invalid)
        render json: { error: invalid.record.errors }, status: :unprocessable_entity
    end

    # def authorize
    #     return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :account_id
    # end

    def user_params
        params.permit(:company_name, :company_bio, :company_start_date, :account_id)
    end

end
