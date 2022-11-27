GridSize = 16;
playerScore = 0;
computerScore = 0;


//object for grid of boxes
const BoxObject = new Object();
BoxObject.boxNum = 0;
BoxObject.count = 0;
BoxObject.sides = new Array(0, 0, 0, 0); //order: up, down, left, right


//default to what is being passed in from front end
const Move = new Object
Move.player = "player";
Move.boxNum1 = -1;
Move.move1 = -1; //default -1, change to 0,1,2 or 3 
Move.boxNum2 = -1;
Move.move2 = -1; //default -1, change to 0,1,2 or 3 
// Move.boxNum3 = -1;
// Move.move3 = -1; //default -1, change to 0,1,2 or 3
// Move.boxNum4 = -1;
// Move.move4 = -1; //default -1, change to 0,1,2 or 3 


//Convert Move Index To Move Name
var MoveConversion = new Map([
	[0, "up"],
	[1, "down"],
	[2, "left"],
	[3, "right"]
]);

//Creating Board
board = new Array();

function setup(){
		for(i in range(1,GridSize)){
			box = BoxObject;
			board.push(box)
		}
	
}





function boardUpdate(player_move){

  console.log("recieved players move, performing board update")
	if(player_move.boxNum1 !=-1){
		board[player_move.boxNum1-1].sides[player_move.move1] = 1;
		board[player_move.boxNum1-1].count++;
    console.log("player's move changes board at box1 and move 1")
	}

  
  if(player_move.boxNum2 !=-1){
		board[player_move.boxNum2-1].sides[player_move.move2] = 1;
		board[player_move.boxNum2-1].count++;    
    console.log("player's move changes board at box2 and move 2")
  }

  //ALSO ACCOUNT FOR IF PLAYER WINS?????
full_boxes = 0;
for(i in board){
	if(i.count==4){
	full_boxes += 1;
	}
}
if(full_boxes==GridSize*GridSize){
	End_Game();
}
}

//Remove Later - Fixed Move for passed in 
passed_in = Move;
passed_in.boxNum1 = 6;
passed_in.move1 = 1; //box 1's up
passed_in.boxNum2 = 2;
passed_in.move2 = 3; //box 2's down

//pretend passed_in is being passed into boardUpdate
boardUpdate(passed_in)



//Calculate which sides can be changed
function possibleMoves(box){
	moves = new Array();
	for(let i = 0; i < box.sides.size; i++){
		if(box.sides[i]==0){
			moves.push(i);
		}
	}
	return moves;
}

function getAttached(curr_box){

  if(curr_box == )
  up = curr_box - GridSize;
  down = curr_box + GridSize;
  left = curr_box - 1;
  right = curr_box + 1;
  ret_list = new Array(up, down, left, right);
  return ret_list;
}

//make computer move after 
function ComputerMove(){
  console.log("player's move registered, about to make computer move")
  newMove = Move
  newMove.player = "Computer"
  
  for (let i = 0; i < board.size; i++) {
    if(board[i].count == 3){
  		console.log("there were 3 lines available, about to make bestMove")
      bestMove(); //called when there is a winning line available
      return; //send back to player
    }   
  }

  for (let j = 0; j < board.length; j++) {
    //j is the curr box
    if(board[j].count == 1){
      console.log("count was 1, making random move in this box")
      //check for attached boxes, if any of them are 2, continue
      was_two = 000
      attached = getAttached(j)
      for(i in attached){
        if(board[i].count == 2){
          was_two = 111
          break
        }
      }
      
      if(was_two = 111){
        continue
      } else{
        randomMove(j)
        return;
      }
        
    }   
  }
  
}




function bestMove(){
  //make winning line
  //recursiveky make lines 
	for(i in board)
	for(j in board){
		if(j.fill == 3){
			
		}
		
	}

}

function randomMove(box_num){
randMove = Move;
randMove.boxNum1 = location;
const randomMove = board[Math.floor(Math.random() * board.length)];
passed_in.move1 = randomMove;
passed_in.boxNum2 = neighbour;
passed_in.move2 = 1;
	
	
}

function reset(){
	
}



function endGame(){
	
}












