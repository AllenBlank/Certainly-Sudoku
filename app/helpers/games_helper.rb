module GamesHelper
  def is_solved?
    solution = params[:solution] ? params[:solution] : ""
    solution == @game.puzzle.solution
  end
end