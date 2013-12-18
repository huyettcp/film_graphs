class Month < ActiveRecord::Base
  attr_accessible :average_drop, :average_gross, :month_name, :number_of_movies_released, :percent_of_year, :top_movie_gross, :top_movie_title, :total_month_gross, :year
end
