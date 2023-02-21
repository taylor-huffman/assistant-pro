class SessionsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
before_action :authorize
skip_before_action :authorize, only: [:create, :destroy]

    def create
        account = Account.find_by(email: params[:email])
        if account&.authenticate(params[:password])
            session[:account_id] = account.id
            render json: account, status: :created
        else
            render json: { error: {login: "Invalid email or password"} }, status: :unauthorized
        end
    end

    def destroy
        session.delete :account_id
        head :no_content
    end

    private

    def authorize
        return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :account_id
    end
    
    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
