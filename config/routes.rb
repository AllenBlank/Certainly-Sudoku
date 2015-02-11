Rails.application.routes.draw do
  
  get 'puzzles/new'

  get 'about' => 'static_pages#about'

  root 'static_pages#home'

end
