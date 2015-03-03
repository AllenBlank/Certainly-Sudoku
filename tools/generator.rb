load 'solver.rb'


# this is stolen from another ruby quiz, the method itself and
# a couple of lines too.

# http://rubyquiz.strd6.com/quizzes/182-sudoku-generator

class Generator
  attr_accessor :puzzle
  def initialize pattern="0"*81
    order = gen_order pattern
    solution = Solver.new( gen_seed ).solution
    solution = solution.split('').map {|s| s.to_i}
    @puzzle = poke_holes(solution, order).join
  end
  
  def poke_holes puzzle, order
    number_of_holes = order.length < 60 ? order.length : 60
    number_of_holes.times do |i|
      square_number = order[i]
      puzzle[ square_number ] = 0
    end
    puzzle
  end
  
  def gen_seed
    puzzle = [0] * 81

    a = (1..9).sort_by{rand}
    b = (1..9).sort_by{rand}
    c = (1..9).sort_by{rand}
    
    # Completely fill in the upper-left 3x3 section.
    puzzle[0..2] = a[0..2]
    puzzle[9..11] = a[3..5]
    puzzle[18..20] = a[6..8]
    
    # Completely fill in the center 3x3 section. 
    puzzle[30..32] = b[0..2]
    puzzle[39..41] = b[3..5]
    puzzle[48..50] = b[6..8]
    
    # Completely fill in the lower-right 3x3 section.
    puzzle[60..62] = c[0..2]
    puzzle[69..71] = c[3..5]
    puzzle[78..80] = c[6..8]
    
    puzzle.join
  end
  
  def gen_order pattern
    pattern = pattern.split('')
    order = []
    81.times do |i|
      order << i if pattern[i] == "0"
    end
    order.shuffle
  end
  
  def to_s
    @puzzle
  end
end