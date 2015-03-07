== README
This is a somewhat simple sudoku app.
For most users it would serve as a single page app. They come, see a puzzle,
solve it and start a new one afterwards.
The game state is saved automatically every two minutes if it's state has changed.
The game id is saved in a temporary cookie and the state is saved and served serverside.
If a user chooses to log in, they can save and switch between multiple games/puzzles
each with different states.
Any ownerless game visited by a logged in user has it's ownership changed to the user that
first visited it.
Games are private, except to admins who can view and delete games / puzzles (the initial and solved state of a game) and users.

- Eventually... the idea is to make the difficulty and rating of puzzles fluid.
- Puzzle difficulty will be determined by it's deviation from the aggregate solve time.
- Puzzle rating will be determined by it's deviation from the aggregate solve rate (vs abandonment).
- User smartitude will be determined by their average deviation from the puzzle median solve time weighted for difficulty.

- Players will have to defend their puzzle from bats and tanks??? could be sweet.
<tt>rake doc:app</tt>.
