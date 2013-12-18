

require 'spec_helper'

describe Month do 
  it { should allow_value("December").for(:month_name) }
  it { should allow_value("The Avengers").for(:top_movie_title) }
  it { should allow_value(70000000).for(:top_movie_gross) }
  it { should allow_value(2012).for(:year) }
  it { should allow_value(23.3).for(:percent_of_year) }
  it { should allow_value(40).for(:number_of_movies_released) }
  it { should allow_value(20.4).for(:average_gross) }
  it { should allow_value(20.5).for(:average_drop) }

end
