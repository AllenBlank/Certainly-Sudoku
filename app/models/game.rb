class Game < ActiveRecord::Base
  belongs_to :user
  belongs_to :puzzle
  
  before_save :ensure_valid_board_state, :track_time
  serialize :board_state
  
  def set_default_board_state
    board = self.puzzle.board.split('')
    board_state = {}
    
    81.times do |i|
      text = ""
      classes = ""
      num = i.to_s
      board_state[num] = {}
      
      if board[i] != "0" then
        text = board[i]
        classes = "permanent "
      end
      
      classes = add_border_classes( classes, i )
      
      board_state[num]["classes"] = classes
      board_state[num]["text"] = text 
      board_state[num]["pencilMarks"] = ""
    end
    self.board_state = board_state
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
  
  def has_user?
    !self.user.nil?
  end
  
  private
    
    def ensure_valid_board_state
      set_default_board_state unless has_valid_board_state?
    end
    
    def add_border_classes (classes, i)
      classes += "square "
      classes += "thick-top "    if i / 9 == 0    # the first row gets a top border
      classes += "thick-left "   if i % 9 == 0    # the first col gets a left border
      classes += "thick-right "  if i % 3 == 2    # every third square gets a right border
      classes += "thick-bottom " if (i % 27) > 17 # every third row gets a bottom border (this could be smarter)
      classes
    end
    
    def track_time
      self.last_played_at ||= Time.now
      
      unless self.completed_at
        self.time_spent ||= 0
        time_since = Time.now - self.last_played_at
        self.time_spent += time_since if time_since < 3000
      end
      
      self.last_played_at = Time.now
    end
  
end
