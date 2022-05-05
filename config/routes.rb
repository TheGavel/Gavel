Rails.application.routes.draw do
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback"
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider
  get 'user_sessions/new'
  get 'user_sessions/create'
  get 'user_sessions/destroy'
  root "users#index"

  # root "users#index"
  root "products#index"
  resources :users do
    member do
      get :activate
    end
  end

  get 'login' => 'user_sessions#new', :as => :login
  post 'login' => "user_sessions#create"
  post 'logout' => 'user_sessions#destroy', :as => :logout

  resources :products do
    collection do
      get :own
    end
  end


  # do
  #   collection do
  #     get :own
  #   end
  # end
end
