class MonthsController < ApplicationController
  def index
    @months = Month.where("year = 2012").order("id DESC")
    respond_to do |format|
      format.html
      format.json { render :json => @months}
    end
  end

  def twenty_eleven
    @months = Month.where("year = 2011").order("id DESC")
    respond_to do |format|
      format.html
      format.json { render :json => @months}
    end
  end
end
