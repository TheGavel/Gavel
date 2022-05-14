Rails.application.routes.draw do
  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback"
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

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
  resources :rooms do
    collection do
      get :own
    end
  end

  namespace :sms_auth do
    resource :registration,
             controller: :registration,
             only: %i[new create]
    resource :verification,
    controller: :verification,
    only: %i[new create]
  end
end
