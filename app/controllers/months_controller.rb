class MonthsController < ApplicationController
  def index
    @months = Month.where("year = 2012").order("id DESC")
    respond_to do |format|
      format.html
      format.json { render :json => @months}
    end
  end

  def get_year
    year = params[:year]
    @months = Month.where("year = #{year}").order("id DESC")
    respond_to do |format|
      format.html
      format.json { render :json => @months}
    end
  end
end
