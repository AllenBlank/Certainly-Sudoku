class CreateMasterPuzzleStats < ActiveRecord::Migration
  def change
    create_table :master_puzzle_stats do |t|
      t.integer :median_solve_time
      t.integer :solve_time_stdev
      t.float :median_solve_rate
      t.float :solve_rate_stdev

      t.timestamps null: false
    end
  end
end
