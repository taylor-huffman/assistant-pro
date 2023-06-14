class EmployersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

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
        current_user = Account.find(session[:account_id])
        employer = current_user.create_employer!(employer_params)
        render json: employer
    end

    def update
        current_user = Account.find(session[:account_id])
        employer = current_user.employer
        if employer.id == params[:id].to_i
            employer.update!(employer_params)
            render json: employer
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        current_user = Account.find(session[:account_id])
        employer = current_user.employer
        if employer.id == params[:id].to_i
            employer.destroy
            head :no_content
        else
            render json: { error: ["Sorry, you're not authorized"] }, status: :unauthorized
        end
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

    def employer_params
        params.permit(:company_name, :company_bio, :company_start_date, :account_id)
    end

    # def current_user
    #     @current_user ||= Account.find(session[:account_id])
    # end

end
