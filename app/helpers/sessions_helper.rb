module SessionsHelper

  # Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id
  end
  
  # Logs in the given user.
  def log_out
    session[:user_id] = nil
  end

  # Returns the current logged-in user (if any).
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end
  
  def is_admin?
    current_user.admin
  end
  
  def check_is_admin
    unless is_admin?
      bounce_chumps "You're not an admin."
    end
  end
  
  def check_logged_in
    unless logged_in?
      bounce_chumps "Please log in."
    end
  end
  
  def bounce_chumps(msg)
      flash[:danger] = msg
      redirect_to root_url
  end
  
end