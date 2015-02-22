class Game < ActiveRecord::Base
  belongs_to :user
  belongs_to :puzzle
  
  def reset_board_state
    board = self.puzzle.board.split('')
    
    board_state = {}
    
    81.times do |i|
      if board[i] != "0" then
        text = board[i]
        classes = " permanent "
      end
      
      text ||= ""
      classes ||= ""
      
      board_state[i.to_s] = {}
      
      board_state[i.to_s]["classes"] = classes
      board_state[i.to_s]["text"] = text 
      board_state[i.to_s]["pencilMarks"] = ""
    end
    self.update(board_state: board_state.to_json)
  end
end
