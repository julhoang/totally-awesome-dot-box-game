# totally-awesome-dot-box-game
A smart AI vs Player  dots and boxes game made in 6.5 hours to meet requirements of the UVic Engineering Competition.

## About The Competition: 
Every fall and summer term, the ESS organizes the UVic Engineering competition, or UVEC. UVEC consists of multiple engineering related competitions that pits engineering undergraduates against their peers. Winner move on to the regional competition, Western Engineering Competition (WEC). 
from: onlineacademiccommunity.uvic.ca/ess/competitions/

## Our Team
- Khushboo Chugh
- Julia Hoang
- Christopher Huk

## Requirements: 
- Create a AI
- Create a Graphical User Interface (GUI)
- Complete the game in approximately 6.5 hours

## Our AI Algorithm:
1. Recursively looks for a box with 3 lines at the current gamestate so it can successfully fill the fourth and win
2. If a box with 3 lines is not available, look for a box with only 1 line. This avoids looking for a box with 2 preexisting lines as making the 3rd line will set up the player to make the fourth (and thereby claim the box).
3. If conditions 1 and 2 are not met, make a random move on the gamestate. 




