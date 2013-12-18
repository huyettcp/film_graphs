class Movie < ActiveRecord::Base
  attr_accessible :budget, :gross, :title, :year
end
