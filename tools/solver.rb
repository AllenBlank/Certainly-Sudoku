# this solver ripped off from a rubyquiz answer by David Tran.
# it is hot shit, and I am ashamed to have given up trying to make my own.

class Solver
  attr_accessor :solution  
  def initialize( input )
    @ary = Array.new(9) { Array.new(9) }  # 9 rows x 9 columns
    index = 0
    input.scan(/./) do |c|
      case c
        when '1'..'9' 
          @ary[index / 9][index % 9] = c.to_i
        when '0'
          # do nothing
        else 
          next
      end
      break if (index += 1) == 9 * 9
    end
    @solution = solve ? to_s : nil
  end

  def solve
    9.times do |row|
      9.times do |col|
        next if @ary[row][col]
        
        # find next possible value for @ary[row][col]
        1.upto(9) do |v|          
          # check on same row/col, no any col/row already used it
          next unless 9.times { |i| break if @ary[i][col] == v || @ary[row][i] ==v }
          
          # check on 3x3 box, no other cell already used it
          next unless 3.times do |i|
            break unless 3.times do |j|
              break if @ary[i + row / 3 * 3][j + col / 3 * 3] == v
            end
          end
          
          @ary[row][col] = v

          if solve
            return true
          else
            @ary[row][col] = nil  # backtracking
          end          
        end
        
        return false
      end
    end
    true
  end
  
  def to_s
    @ary.flatten.join
  end
end

# if __FILE__ == $0
#   input = gets.chomp

#   solution = Solver.new(input).solution
#   puts solution ? solution : "No solution."
# end