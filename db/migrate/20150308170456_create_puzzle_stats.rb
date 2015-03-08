class CreatePuzzleStats < ActiveRecord::Migration
  def change
    create_table :puzzle_stats do |t|
      t.integer :median_solve_time
      t.float :solve_rate

      t.timestamps null: false
    end
  end
end
