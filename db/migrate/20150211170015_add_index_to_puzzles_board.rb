class AddIndexToPuzzlesBoard < ActiveRecord::Migration
  def change
    add_index :puzzles, :board, unique: true
  end
end
