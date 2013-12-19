FilmGraphs::Application.routes.draw do
  get 'months', to: 'months#index'

  root :to => 'months#index'
end
