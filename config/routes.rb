GroupExpenser::Application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]

  resources :users do
    resources :purchases, :controller => :expenses, :only => :index
    resources :obligations, :as => :expense_obligations, :controller => :expense_obligations, :only => [:index]
    resources :contributions, :as => :expense_contributions, :controller => :expense_contributions
    resources :payments, only: :index
  end

  resources :trips do
    resources :members, :controller => :members, :only => [:index, :show]
    resources :memberships, :as => :trip_memberships, :only => [:create, :destroy]
    resources :expenses, :only => [:create, :index, :show, :update, :destroy]
  end

  resources :memberships, :as => :trip_memberships, :only => [:show, :index]

  match "organized_trips" => "trips#index", :organized => true, :via => :get

  resources :purchases, :controller => :expenses, :except => [:create]
  resources :expenses, :only => :show do
    resources :obligations, :as => :expense_obligations, :controller => :expense_obligations
    resources :contributions, :as => :expense_contributions, :controller => :expense_contributions
  end

  resources :obligations, :as => :expense_obligations, :controller => :expense_obligations, :only => [:show, :update, :destroy]
  resources :contributions, :as => :expense_contributions, :controller => :expense_contributions

  resources :friendships, :only => [:index, :create, :destroy]

  match "trips/:trip_id/purchases" => "expenses#index", :purchased => true, :via => :get

  get '/twitter_friends', :to => 'find_friends#twitter_friends'
  get '/twitter_friends/find/:handle', :to => 'find_friends#find_twitter_user'
  post '/twitter_friends/invite', :to => 'find_friends#invite_twitter_friend'

  get '/facebook_friends', :to => 'find_friends#facebook_friends'
  get '/facebook_friends/find/:name', :to => 'find_friends#find_facebook_user'
  post '/facebook_friends/invite', :to => 'find_friends#invite_facebook_friend'

  get '/auth/:provider/callback', :to =>'sessions#create', :as =>'callback'
  get '/auth/failure', :to =>'sessions#error', :as =>'failure'
  get '/profile', :to =>'sessions#show', :as =>'show'
  delete '/signout', :to =>'sessions#destroy', :as =>'signout'

  # match '*path', to: redirect('/redirect_to_hash_path'), via: :all
end
