Rails.application.routes.draw do
  

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'signin', to: redirect('auth/facebook'), as: 'signin'
  
  root 'static_pages#home'
  
  resources :puzzles, only: [:new, :create, :show, :destroy, :index]
  
  resources :games, only: [:new, :show, :create, :update]
  get '/users/:users_id/games', to: 'games#index'
  
  resources :users, only: [:show, :destroy, :index]

end
