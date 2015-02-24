class StaticPagesController < ApplicationController
  def home
    if has_current_game?
      redirect_to current_game
    else
      redirect_to new_game_path
    end
  end
end
