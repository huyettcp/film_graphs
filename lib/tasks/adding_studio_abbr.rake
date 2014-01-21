namespace :adding_studio_abbr do
  desc "Adds the studio abbrevriations"
  task :seed => :environment do
  
  require 'nokogiri'
  require 'open-uri'   

  n = Nokogiri::HTML(open("http://boxofficemojo.com/yearly/chart/?yr=2013&p=.htm"))
  noko = 2
  
  while noko <= 102
    abbreviation = n.search("tr[1]/td[1]/table/tr/td/table/tr[#{noko}]/td[3]").text

    studio = Studio.create(abbreviation: abbreviation)
    noko += 1
  end
  end
end
