class Puzzle < ActiveRecord::Base
  # the regex does the length requirement too.
  # exactly 81 numbers in a row from start to end of string.
  VALID_BOARD_REGEX = /\A[0-9]{81}\z/
  validates :board, 
    presence: true, 
    format: {with: VALID_BOARD_REGEX },
    uniqueness: true
end
