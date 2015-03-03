class AddSolutionToPuzzles < ActiveRecord::Migration
  def change
    add_column :puzzles, :solution, :string
  end
end
