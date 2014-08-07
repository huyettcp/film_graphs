class BarController < ApplicationController
  def index
    @movies = Movie.where("studio_id = 1")
    respond_to do |format|
      format.html
      format.json { render :json => @movies }
    end
  end
end
