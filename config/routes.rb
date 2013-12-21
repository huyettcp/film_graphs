FilmGraphs::Application.routes.draw do
  get 'months', to: 'months#index'
  get 'get_year', to: 'months#get_year'
  get 'month_pie', to: 'months#month_pie'

  root :to => 'months#index'
end
