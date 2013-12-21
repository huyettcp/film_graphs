FilmGraphs::Application.routes.draw do
  get 'months', to: 'months#index'
  get 'get_year', to: 'months#get_year'

  root :to => 'months#index'
end
