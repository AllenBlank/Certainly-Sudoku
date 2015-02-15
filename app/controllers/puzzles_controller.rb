class PuzzlesController < ApplicationController
  before_action :this_puzzle, only: [:show, :destroy]
  #respond_to :js, only: [:show, :destroy, :create]
  
  def new
    @puzzle = Puzzle.new
  end
  
  def create
    @puzzle = Puzzle.new(puzzle_parameters)    # Not the final implementation!
    if @user.save
      # Handle a successful save.
    else
      render 'new'
    end
  end
  
  def show
    render json: @puzzle
  end
  
  def destroy
  end
  
  def index
    @puzzles = Puzzle.all
    render json: @puzzles
  end
  
  private
  
    def this_puzzle
      @puzzle = Puzzle.find(params[:id])
    end
    
    def puzzle_parameters
      params.require(:puzzle).permit(:board, :difficulty, :rating)
    end
  
end
