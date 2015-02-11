class Puzzle < ActiveRecord::Base
  # the regex does the length requirement too.
  # exactly 81 numbers in a row from start to end of string.
  VALID_BOARD_REGEX = /\A[0-9]{81}\z/
  validates :board, 
    presence: true, 
    format: {with: VALID_BOARD_REGEX },
    uniqueness: true
    
  # only allows the strings "easy", "middling", and "tough"  
  VALID_DIFFICULTY_REGEX = /\Aeasy\z|\Amiddling\z|\Atough\z/
  validates :difficulty,
    presence: true,
    format: {with: VALID_DIFFICULTY_REGEX}
  
  # only allows a single digit integer 1 through 5
  VALID_RATING_REGEX = /\A[1-5]\z/
  validates :rating,
    presence: true,
    format: {with: VALID_RATING_REGEX}
end