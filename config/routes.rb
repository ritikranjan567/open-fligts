Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines
      resources :reviews
    end
  end

  match '*path', to: 'pages#index', via: :all,  constraints: lambda {|req| req.path.exclude? 'rails/active_storage'}
end
