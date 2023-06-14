class ApplicationController < ActionController::API
    include ActionController::Cookies

    # private

    # def current_user
    #     @current_user ||= Account.find(session[:account_id])
    # end
end
