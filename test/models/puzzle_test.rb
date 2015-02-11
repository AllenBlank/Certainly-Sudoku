require 'test_helper'

class PuzzleTest < ActiveSupport::TestCase
  def setup
    @puzzle = Puzzle.new(board: "0" * 81, difficulty:"easy", rating: 5)
  end
  
  test "puzzle board is formatted correctly" do
    assert @puzzle.valid?
    @puzzle.board = "1" * 80
    assert_not @puzzle.valid?
    
    setup
    
    assert @puzzle.valid?
    @puzzle.board = "a" * 81
    assert_not @puzzle.valid?
  end
  
  test "puzzle rating and difficulty are formatted correctly" do
    assert @puzzle.valid?
    @puzzle.difficulty = "somethingelse"
    assert_not @puzzle.valid?
    
    setup
    
    @puzzle.rating = 7
    assert_not @puzzle.valid?
  end
  
end
