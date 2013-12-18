class MonthData < ActiveRecord::Base
  attr_accessible :average_drop, :average_gross, :month, :number_of_movies_released, :percent_of_year, :top_movie_gross, :top_movie_title, :year
end
