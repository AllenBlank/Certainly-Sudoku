class GamesController < ApplicationController

  def index
    @user = User.find( params[:users_id] )
    @games = @user.games
  end
  
  def new
    
  end
  
  def create
    
    selected_difficulty = params[:difficulty]
    selected_difficulty ||= "middling"
    puzzle_possibilities = Puzzle.where(difficulty: selected_difficulty)
    user = current_user
    
    if user
      puzzle_possibilities -= user.puzzles
      puzzle = puzzle_possibilities.sample
    end

    puzzle ||= Puzzle.where(difficulty: selected_difficulty).sample
    
    @game = Game.new(puzzle: puzzle, user: user)
    @game.save
    
    session[:current_game_id] = @game.id
    
    redirect_to @game
    
  end
  
  def show
    @game = Game.find( params[:id])
    render json: @game
  end
  
  def update
    @game = Game.find( params[:id] )
    @correct_user = @game.user
    if current_user == @correct_user 
      @game.update( board_state: params[:board_state].to_json )
    end
  end
  
end
