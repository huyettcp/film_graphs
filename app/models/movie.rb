class Movie < ActiveRecord::Base
  attr_accessible :budget, :gross, :title, :year, :studio_id
end
