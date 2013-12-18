FilmGraphs::Application.routes.draw do
  get "movies/index"

  root :to => 'movies#index'
end
