class GamesController < ApplicationController

  def index
    @user = User.find( params[:users_id] )
    @games = @user.games
  end
  
end
