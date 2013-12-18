class CreateMonthData < ActiveRecord::Migration
  def change
    create_table :month_data do |t|
      t.string :month
      t.string :top_movie_title
      t.integer :top_movie_gross
      t.integer :year
      t.float :percent_of_year
      t.integer :number_of_movies_released
      t.float :average_gross
      t.float :average_drop

      t.timestamps
    end
  end
end
