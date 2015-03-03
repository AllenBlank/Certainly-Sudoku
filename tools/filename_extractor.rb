
reg = /:.*/

path = 'input.txt'
lines = []
File.readlines(path).each do |line|
  line.gsub! reg, ""
  lines << 'cp "' + line.chomp + '.jpg" redo/'
end

path = 'output.txt'
File.open(path, 'w') do |file|
  file.puts lines
end