Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :oauths, only: [] do
    collection do
      post :callback
      get :callback
      get ':provider' => "oauths#oauth", :as => :auth_at_provider
    end
  end

  root "products#index"
  resources :users do
    member do
      get :activate
    end
  end

  resources :user_sessions, only: [:new, :create] do
    collection do
      delete :destroy
    end
  end

#   user_sessions_path	POST	/user_sessions(.:format)
# user_sessions#create

# new_user_session_path	GET	/user_sessions/new(.:format)
# user_sessions#new

# user_session_path	DELETE	/user_sessions/:id(.:format)
# user_sessions#destroy



  # get 'login' => 'user_sessions#new', :as => :login
  # post 'login' => "user_sessions#create"
  # post 'logout' => 'user_sessions#destroy', :as => :logout

  resources :products do
    collection do
      get :own
      get :autocomplete
      get "search/*path" , to: 'products#index'
      get "categories/*path" , to: 'products#index'
    end
  end

  resources :rooms do
    collection do
      get :own
      
    end
    member do
      resources :messages, only: [:create]
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
      namespace :rooms, only: [] do
        resources :getavatar, only: [:show]
      end
      namespace :products, only: [] do
        resources :categories, only: [:show] do
          get :architecture, on: :collection
          get ':page', to: 'categories#page'
        end
        resources :search, only: [:show] do
          get ':page', to: 'search#page'
        end
      end

    end
  end
end
