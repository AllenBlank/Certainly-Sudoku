class RemoveDifficultyFromPuzzles < ActiveRecord::Migration
  def change
    remove_column :puzzles, :difficulty, :string
  end
end
