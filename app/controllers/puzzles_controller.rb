class PuzzlesController < ApplicationController
  before_action :check_is_admin
  
  def new
    @puzzle = Puzzle.new
  end
  
  def create
    @puzzle = Puzzle.new #to allow default attributes to set
    @puzzle.attributes = puzzle_parameters
    if @puzzle.save
      redirect_to @puzzle
    else
      render 'new'
    end
  end
  
  def show
    @puzzle = Puzzle.find(params[:id])
  end
  
  def destroy
    @puzzle = Puzzle.find(params[:id])
    flash[:success] = "Puzzle #{@puzzle.id} deleted"
    @puzzle.destroy
    redirect_to puzzles_url
  end
  
  def index
    @puzzles = Puzzle.paginate(page: params[:page], per_page: 5)
#    render json: @puzzles
  end
  
  private
    
    def puzzle_parameters
      params.require(:puzzle).permit(:board, :difficulty, :rating)
    end
  
end
