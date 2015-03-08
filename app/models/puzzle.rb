class Puzzle < ActiveRecord::Base
  has_many :games, dependent: :destroy
  has_many :users, through: :games
  has_one :puzzle_stats, dependent: :destroy
  
  after_initialize :create_puzzle_stats
  # the regex does the length requirement too.
  # exactly 81 numbers in a row from start to end of string.
  VALID_BOARD_REGEX = /\A[0-9]{81}\z/
  validates :board, 
    presence: true, 
    format: {with: VALID_BOARD_REGEX },
    uniqueness: true
  
  validates :solution, 
    presence: true, 
    format: {with: VALID_BOARD_REGEX }
    
  def rating
    self.puzzle_stats.rating
  end
  
  def difficulty
    self.puzzle_stats.difficulty
  end
    
  private
  
    def create_puzzle_stats
      self.puzzle_stats ||= PuzzleStats.create 
    end
  
end
