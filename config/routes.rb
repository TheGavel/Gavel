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
      get :autocomplete
      get "search/*path" , to: 'products#index'
      get "category/*path" , to: 'products#index'
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
  # member do
  # end

  namespace :api do
    namespace :v1 do
      namespace :products, only: [] do
        resources :categories, only: [:show] do
          get :architecture, on: :collection
          get ':page', to: 'categories#page'
        end
        resources :search, only: [:show] do
          get ':page', to: 'search#page'
        end
      end
      namespace :products, only: [] do
        resources :search, only: [:show] do
          get ':page', to: 'search#page'
        end
      end
    end
  end

end
