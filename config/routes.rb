Rails.application.routes.draw do
  

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'signin/facebook', to: redirect('auth/facebook'), as: 'facebook_signin'
  get 'signin/google', to: redirect('auth/google_oauth2'), as: 'google_signin'
  
  root 'static_pages#home'
  
  resources :puzzles, only: [:new, :create, :show, :destroy, :index]
  
  resources :games, only: [:new, :show, :create, :update, :destroy]
  get '/users/:users_id/games', to: 'games#index'
  
  resources :users, only: [:show, :destroy, :index]

end
