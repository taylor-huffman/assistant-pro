Rails.application.routes.draw do
  resources :reviews
  resources :task_agreements
  resources :assistant_tasks
  resources :task_post_categories
  resources :task_posts
  resources :task_categories
  resources :employers
  resources :assistants
  resources :accounts
  post "/login", to: "sessions#create"
  get "/auth", to: "accounts#show"
  delete "/logout", to: "sessions#destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
