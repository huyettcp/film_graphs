class Studio < ActiveRecord::Base
  attr_accessible :abbreviation
  has_many :movies
  validates_uniqueness_of :abbreviation
end
