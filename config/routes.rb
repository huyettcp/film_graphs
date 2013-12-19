FilmGraphs::Application.routes.draw do
  get 'months', to: 'months#index'
  get 'twenty_eleven', to: 'months#twenty_eleven'

  root :to => 'months#index'
end
