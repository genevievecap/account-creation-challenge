Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create, :destroy]

  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup
  get 'create-account', to: 'application#render_react', as: :createAccount

  post 'api/validate_account', to: 'api#validate_account'
  get 'api/get_account', to: 'api#get_account'
end
