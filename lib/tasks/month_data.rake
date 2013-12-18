namespace :month_data do
  desc "Generates month data"
  task :seed => :environment do

  require 'nokogiri'
  require 'open-uri'  



  n = Nokogiri::HTML(open("http://www.boxofficemojo.com/monthly/?view=releasedate&chart=byyear&yr=2012&view=releasedate"))

  month_name = n.search("tr[2]/td[1]").text
  top_movie_title = n.search("tr[2]/td[7]").text
  top_movie_gross = n.search("tr[2]/td[8]").text.gsub("$","").to_f 
  total_month_gross = n.search("tr[2]/td[2]").text.gsub("$","").gsub(",","").to_f 
  year = 2012
  percent_of_year = n.search("tr[2]/td[3]").text.gsub("%","").to_f
  number_of_movies_released = n.search("tr[2]/td[4]").text.to_i
  average_gross = n.search("tr[2]/td[5]").text.gsub("$","").to_f 
  average_drop = n.search("tr[2]/td[6]").text.gsub("%", "").to_f

  month = Month.create(month_name: month_name, top_movie_title: top_movie_title, top_movie_gross: top_movie_gross, total_month_gross: total_month_gross, year: year, percent_of_year: percent_of_year, number_of_movies_released: number_of_movies_released, average_gross: average_gross, average_drop: average_drop)
end
end
