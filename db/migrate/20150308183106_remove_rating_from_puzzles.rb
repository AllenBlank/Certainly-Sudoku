class RemoveRatingFromPuzzles < ActiveRecord::Migration
  def change
    remove_column :puzzles, :rating, :integer
  end
end
