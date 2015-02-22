class Game < ActiveRecord::Base
  belongs_to :user
  belongs_to :puzzle
  
  before_save :ensure_valid_board_state
  serialize :board_state
  
  def set_default_board_state
    board = self.puzzle.board.split('')
    board_state = {}
    
    81.times do |i|
      text = ""
      classes = ""
      
      if board[i] != "0" then
        text = board[i]
        classes = "permanent "
      end
      
      num = i.to_s
      board_state[num] = {}
      
      board_state[num]["classes"] = classes
      board_state[num]["text"] = text 
      board_state[num]["pencilMarks"] = ""
    end
    self.update(board_state: board_state)
  end
  
  def has_valid_board_state?
    begin
      board_state = self.board_state
      81.times do |i|
        num = i.to_s
        board_state[num]["classes"][0] && board_state[num]["text"][0] && board_state[num]["pencilMarks"][0]
      end
    rescue
      return false
    end
    true
  end
  
  private
    
    def ensure_valid_board_state
      set_default_board_state unless has_valid_board_state?
    end
  
end
