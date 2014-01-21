namespace :adding_2013_titles do
  desc "Adds the studio movies"
  task :seed => :environment do
  
  require 'nokogiri'
  require 'open-uri'   

  n = Nokogiri::HTML(open("http://boxofficemojo.com/yearly/chart/?yr=2013&p=.htm"))
  noko = 2
  
  while noko <= 101
    title = n.search("tr[1]/td[1]/table/tr/td/table/tr[#{noko}]/td[2]").text
    abbreviation = n.search("tr[1]/td[1]/table/tr/td/table/tr[#{noko}]/td[3]").text
    gross = n.search("tr[1]/td[1]/table/tr/td/table/tr[#{noko}]/td[4]").text.gsub("$","").gsub(",","").to_i
    year = 2013

    studio_id = Studio.find_by_abbreviation(abbreviation)

    movie = Movie.create(title: title, gross: gross, year: year, studio_id: studio_id.id)
    noko += 1
  end
  end
end
