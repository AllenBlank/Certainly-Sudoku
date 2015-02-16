Rails.application.routes.draw do
  

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'signin', to: redirect('auth/facebook')
  
  root 'static_pages#home'
  resources :puzzles, only: [:new, :create, :show, :destroy, :index]

end
