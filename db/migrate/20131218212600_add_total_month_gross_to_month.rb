class AddTotalMonthGrossToMonth < ActiveRecord::Migration
  def change
    add_column :months, :total_month_gross, :float
  end
end
