class AddPuzzleIdToPuzzleStats < ActiveRecord::Migration
  def change
    add_column :puzzle_stats, :puzzle_id, :integer
  end
end
