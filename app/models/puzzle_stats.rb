class PuzzleStats < ActiveRecord::Base
  belongs_to :puzzle
  after_initialize :update_if_its_been_awhile
  
  def difficulty
    return "middling" unless self.median_solve_time && MasterPuzzleStats.median_solve_time
    deviations = (self.median_solve_time - MasterPuzzleStats.median_solve_time) / MasterPuzzleStats.solve_time_stdev
    if deviations > 1
      return "tough"
    elsif deviations < -1
      return "easy"
    else
      return "middling"
    end
  end
  
  def rating
    return "good" unless self.solve_rate && MasterPuzzleStats.median_solve_rate
    deviations = (self.solve_rate - MasterPuzzleStats.median_solve_rate) / MasterPuzzleStats.solve_rate_stdev
    if deviations > 1
      return "great"
    elsif deviations < -1
      return "not so great"
    else
      return "good"
    end
  end
  
  def update_stats
    games = self.puzzle.games
    solved_games = games.where.not(completed_at: nil)
    solve_rate = solved_games.length / games.length
    
    solve_times = solved_games.map {|game| game.time_spent}.sort
    median_solve_time = solve_times[ (solve_times.length / 2).to_i ]
    
    self.solve_rate = solve_rate
    self.median_solve_time = median_solve_time
    self.save
  end
  
  private
  
    def update_if_its_been_awhile
      self.updated_at ||= Time.now
      if (Time.now - self.updated_at) > 1.week
        update_stats
      end
    end
end
