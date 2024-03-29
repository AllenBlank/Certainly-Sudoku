class GamesController < ApplicationController
  before_action :set_game, :check_is_correct_user, only: [:show, :update, :destroy]
  before_action :correct_user_for_index, only: [:index]
  
  def index
    @user = User.find( params[:users_id] )
    @games = @user.games.order('last_played_at DESC')
    @games = @games.paginate(page: params[:page], per_page: 5)
  end
  
  def new
    create
  end
  
  def create
    
    selected_difficulty = params[:difficulty]
    selected_difficulty ||= "middling"
    puzzle_possibilities = Puzzle.all.select {|each_puzzle| each_puzzle.difficulty == selected_difficulty}
    user = current_user

    if user
      puzzle_possibilities -= user.puzzles
      puzzle = puzzle_possibilities.sample
    end

    puzzle ||= Puzzle.all.select {|each_puzzle| each_puzzle.difficulty == "middling"}.sample
    
    @game = Game.new(puzzle: puzzle, user: user)
    @game.save
    puzzle.puzzle_stats.update_stats
    
    session[:current_game_id] = @game.id
    
    redirect_to @game
  end
  
  def destroy
    flash[:success] = "Game #{@game.id} deleted."
    @game.destroy
    redirect_to controller: "games", action: "index", users_id: current_user.id
  end
  
  def show
    
    set_current_game @game
    
    unless logged_in? && current_game.has_user?
      @game.update user: current_user
    end
    @game.update last_played_at: Time.now
    @board_state = @game.board_state  #find this string extension in core_class_extensions.rb in initializers.
  end
  
  def update
    correct_user = @game.user
    
    board_state = params[:boardState]
    
    if (current_user == correct_user) 
      @game.update( board_state: board_state)
    end
    
    if is_solved? 
      if @game.completed_at.nil?
        @game.update completed_at: Time.now
        @game.puzzle.puzzle_stats.update_stats
      end
      @solved = true
      @completion_time = @game.time_spent
    end
    
  end
  
  private
  
    def set_game
      @game = Game.find( params[:id] )
    end
    
    def is_correct_user?
      (current_user == @game.user) || @game.user.nil?
    end
    
    def check_is_correct_user
      unless is_correct_user? || is_admin?
        bounce_chumps "You're the wrong user or not logged in, current game reset." 
      end
    end
    
    def correct_user_for_index
      unless is_admin? || current_user.id == params[:users_id].to_i 
        bounce_chumps "You're the wrong user or not logged in."
      end
    end
    
  def is_solved?
    solution = params[:solution] ? params[:solution] : ""
    solution == @game.puzzle.solution
  end
  
end
