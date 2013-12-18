namespace :highest_grossing_movies_of_2013 do
  desc "2013 Totals"
  task :seed => :environment do
  
  require 'nokogiri'
  require 'open-uri'
    
  n = Nokogiri::HTML(open("http://boxofficemojo.com/yearly/chart/?yr=2013&p=.htm"))
  title = n.search("//table/tr/td[1]/table/tr[#{noko}]/td[2]").text
  
  noko = 2
  ceiling = 102

  while noko < ceiling

    noko += 1
    puts noko
  end


    

end
end



