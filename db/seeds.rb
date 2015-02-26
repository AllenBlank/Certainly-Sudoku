# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puzzle_seeds = YAML.load_file('db/puzzle_seeds.yml')

puzzle_seeds.each do |num, seed|
  puzz = Puzzle.new
  puzz.update seed
end