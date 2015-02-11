require 'test_helper'

class PuzzleTest < ActiveSupport::TestCase
  def setup
    @puzzle = Puzzle.new(board: "0" * 81, difficulty:"easy", rating: 5)
  end
  
  test "puzzle should be exactly 81 characters long" do
    assert @puzzle.valid?
    @puzzle.board = "1" * 80
    assert_not @puzzle.valid?
  end
  
  test "puzzle should be only numbers" do
    assert @puzzle.valid?
    @puzzle.board = "a" * 81
    assert_not @puzzle.valid?
  end
  
end
