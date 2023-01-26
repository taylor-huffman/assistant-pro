class SessionsController < ApplicationController
    def create
        account = Account.find_by(email: params[:email])
        if account&.authenticate(params[:password])
            session[:account_id] = account.id
            render json: account, status: :created
        else
            render json: { error: {login: "Invalid email or password"} }, status: :unauthorized
        end
    end
end
