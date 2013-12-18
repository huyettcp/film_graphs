class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :year
      t.integer :budget
      t.integer :gross

      t.timestamps
    end
  end
end
