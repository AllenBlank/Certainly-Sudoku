class PuzzlesController < ApplicationController
  before_action :this_puzzle, only: [:show, :destroy]
  #respond_to :js, only: [:show, :destroy, :create]
  
  def new
  end
  
  def create
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
  
end
