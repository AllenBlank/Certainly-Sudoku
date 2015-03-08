load 'generator.rb'
require 'yaml'

print "Filename: "
file_name = gets.chomp

puzzle_regex = /[0-9]{81}/
puzzle_list = []

lines = File.readlines(file_name)

lines.each do |line| 
  matches = line.scan puzzle_regex
  
  matches.each do |match|
    puzzle_list << match
  end
  
end

puzzles = puzzle_list.shuffle
seed_puzzles = {}

100.times do |num|
  solution = Solver.new(puzzles[num]).solution
  seed_puzzles[num] = {
    "board"      => puzzles[num],
    "solution"   => solution
  }

end
  
File.open("puzzle_seeds.yml", "w") do |file|
  file.write seed_puzzles.to_yaml
end