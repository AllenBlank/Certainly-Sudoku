class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.string :board
      t.string :difficulty
      t.integer :rating

      t.timestamps null: false
    end
  end
end
