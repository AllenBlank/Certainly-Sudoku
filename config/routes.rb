Rails.application.routes.draw do
  
  root 'static_pages#home'
  resources :puzzles, only: [:new, :create, :show, :destroy, :index]

end
