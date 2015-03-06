class StaticPagesController < ApplicationController
  def home
    if has_current_game? && ( (current_game.user == current_user) || current_game.user.nil? )
      redirect_to current_game
    else
      redirect_to new_game_path
    end
  end
end
