module SessionsHelper
  # this helper ought to be included in the application controller for use
  # in all controllers
  
  
  # Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id
  end
  
  # Logs out the given user.
  def log_out
    session[:user_id] = nil
    session[:current_game_id] = nil
  end

  # Returns the current logged-in user (if any).
  def current_user
    begin
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue
      log_out
      return nil
    end
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end
  
  # Returns true if the user is admin, false otherwise.
  def is_admin?
    logged_in? && current_user && current_user.admin
  end
  
  # a before_action check for use across controllers, kick non-admins back to root and give them the error
  def check_is_admin
    unless is_admin?
      bounce_chumps "You're not an admin."
    end
  end
  
  # same...
  def check_logged_in
    unless logged_in?
      bounce_chumps "Please log in."
    end
  end
  
  # helper for my helper, kick user back to url, display error msg
  def bounce_chumps(msg, url=root_url)
      flash[:danger] = msg
      redirect_to root_url
  end
  
  # return the current game stored in session, here because it sorta fits in sessions and 
  # needs to be used across controllers... maybe a better fit in application helper?
  def current_game
    begin
      @current_game ||= Game.find(session[:current_game_id])
    rescue
      log_out
      return nil
    end
  end
  
  # returns true if there's a game stored in cookies
  def has_current_game?
    !session[:current_game_id].nil? && current_game
  end
  
  # sets the game cookie...
  def set_current_game(game)
    session[:current_game_id] = game.id
  end
  
end