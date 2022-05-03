Rails.application.routes.draw do
  get 'user_sessions/new'
  get 'user_sessions/create'
  get 'user_sessions/destroy'
  root "users#index"
  
  resources :users do
    member do
      get :activate
    end
  end

  get 'login' => 'user_sessions#new', :as => :login
  post 'login' => "user_sessions#create"
  post 'logout' => 'user_sessions#destroy', :as => :logout
end
