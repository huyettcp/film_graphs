FilmGraphs::Application.routes.draw do
  get 'months', to: 'months#index'
  get 'get_year', to: 'months#get_year'
  get 'month_pie', to: 'months#month_pie'
  get 'get_year_pie', to: 'months#get_year_pie'
  get 'bar', to: 'bar#index'

  root :to => 'months#index'
end
