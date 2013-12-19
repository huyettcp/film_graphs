class MonthsController < ApplicationController
  def index
    @months = Month.order("id DESC")
    respond_to do |format|
      format.html
      format.json { render :json => @months}
    end
  end
end
