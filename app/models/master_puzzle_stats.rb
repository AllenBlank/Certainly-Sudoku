class MasterPuzzleStats < ActiveRecord::Base
  
  def self.median_solve_time
    @@median_solve_time
  end
  
  def self.median_solve_rate
    @@median_solve_rate
  end
  
  def self.solve_time_stdev
    @@solve_time_stdev
  end
  
  def self.solve_rate_stdev
    @@solve_rate_stdev
  end
  
  def self.set_stats
    @@last_updated = Time.now
    
    puzzle_solve_rates = []
    puzzle_solve_times = []
    
    puzzles = Puzzle.all
    puzzles.each do |puzzle|
      puzzle_solve_rates << puzzle.puzzle_stats.solve_rate
      puzzle_solve_times << puzzle.puzzle_stats.median_solve_time
    end
    
    puzzle_solve_rates.compact!.sort!
    puzzle_solve_times.compact!.sort!
    
    @@median_solve_rate = puzzle_solve_rates[ (puzzle_solve_rates.length / 2).to_i ]
    @@solve_rate_stdev = puzzle_solve_rates.standard_deviation
    
    @@median_solve_time = puzzle_solve_times[ (puzzle_solve_times.length / 2).to_i ]
    @@solve_time_stdev = puzzle_solve_times.standard_deviation
  end
  
  def self.update_if_its_been_awhile
    self.set_stats if Time.now - @@last_updated > 1.hour
  end
  
  self.set_stats
  
end
