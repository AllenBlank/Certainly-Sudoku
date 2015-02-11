class PuzzlesController < ApplicationController
  before_action :this_puzzle, only: [:show, :destroy]
  respond_to :js, only: [:show, :destroy, :create]
  
  def new
  end
  
  def create
  end
  
  def show
  end
  
  def destroy
  end
  
  def index
    @puzzles = Puzzle.all
  end
  
  private
  
  def this_puzzle
    @puzzle = Puzzle.find(params[:id])
  end
  
end
