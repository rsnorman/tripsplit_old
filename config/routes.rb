GroupExpenser::Application.routes.draw do
  resources :users do
    resources :purchases, :controller => :expenses, :only => :index
    resources :obligations, :as => :expense_obligations, :controller => :expense_obligations, :only => [:index]
    resources :contributions, :as => :expense_contributions, :controller => :expense_contributions
    collection do
      post :login
    end
  end

  resources :trips do
    resources :members, :controller => :users, :only => [:index, :show], :member => true
    resources :memberships, :as => :trip_memberships, :only => [:create, :destroy]
    resources :expenses, :only => [:create, :index, :show, :update, :destroy]
  end

  resources :memberships, :as => :trip_memberships, :only => :show

  match "organized_trips" => "trips#index", :organized => true, :via => :get

  resources :purchases, :controller => :expenses, :except => [:create]
  resources :expenses, :only => :show do
    resources :obligations, :as => :expense_obligations, :controller => :expense_obligations
    resources :contributions, :as => :expense_contributions, :controller => :expense_contributions
  end

  resources :obligations, :as => :expense_obligations, :controller => :expense_obligations, :only => [:show, :update, :destroy]
  resources :contributions, :as => :expense_contributions, :controller => :expense_contributions

  match "trips/:trip_id/purchases" => "expenses#index", :purchased => true, :via => :get

  get '/twitter_friends', :to => 'find_friends#twitter_friends'
  post '/twitter_friends/invite', :to => 'find_friends#invite_twitter_friend'

  get '/auth/:provider/callback', :to =>'sessions#create', :as =>'callback'
  get '/auth/failure', :to =>'sessions#error', :as =>'failure'
  get '/profile', :to =>'sessions#show', :as =>'show'
  delete '/signout', :to =>'sessions#destroy', :as =>'signout'
end
