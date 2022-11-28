GridSize = 4;
playerScore = 0;
computerScore = 0;
gameRunning = 1;

//object for grid of boxes
const BoxObject = new Object();
BoxObject.boxNum = 0;
BoxObject.count = 0;
BoxObject.sides = new Array(0, 0, 0, 0); //order: up, down, left, right

//default to what is being passed in from front end
const Move = new Object();
Move.player = "player";
Move.boxNum1 = -1;
Move.move1 = -1; //default -1, change to 0,1,2 or 3
Move.boxNum2 = -1;
Move.move2 = -1; //default -1, change to 0,1,2 or 3

//Convert Move Index To Move Name
var MoveConversion = new Map([
  [0, "up"],
  [1, "down"],
  [2, "left"],
  [3, "right"],
]);

//Creating Board
board = new Array();

function setup() {
  for (var i = 1; i < GridSize * GridSize; i++) {
    box = BoxObject;
    board.push(box);
  }
  gameRunning = 1;
  playerScore = 0;
  computerScore = 0;
}

function test() {
  console.log("Setting Up");
  setup();
  while (gameRunning) {
    box = prompt();
    side = prompt();
    move = Move;
    move.move1 = side;
    move.boxNum1 = box;
    boardUpdate(move);
    ComputerMove();
  }
}
// test();

function boardUpdate(player_move) {
  console.log("recieved players move, performing board update");
  if (player_move.boxNum1 != -1) {
    board[player_move.boxNum1 - 1].sides[player_move.move1] = 1;
    board[player_move.boxNum1 - 1].count++;
    console.log("player's move changes board at box1 and move 1");
  }

  if (player_move.boxNum2 != -1) {
    board[player_move.boxNum2 - 1].sides[player_move.move2] = 1;
    board[player_move.boxNum2 - 1].count++;
    console.log("player's move changes board at box2 and move 2");
  }

  if (player_move.boxNum2 == -1 && player_move.boxNum1 == -1) {
    console.log("No Move Was Made Due to Impossible Move");
  }

  //ALSO ACCOUNT FOR IF PLAYER WINS?????

  //REMOVE?????????? ***********************
  full_boxes = 0;
  for (i in board) {
    if (i.count == 4) {
      full_boxes += 1;
    }
  }
  if (full_boxes == GridSize * GridSize) {
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
boardUpdate(passed_in);

//Calculate which sides can be changed
//Up Down Left Right
function possibleMoves(box) {
  moves = new Array();
  for (let i = 0; i < box.sides.size; i++) {
    if (box.sides[i] == 0) {
      moves.push(i);
    }
  }
  return moves;
}

function getAttached(curr_box) {
  //1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
  up = -1;
  down = -1;
  left = -1;
  right = -1;
  if (curr_box == 6 || curr_box == 7 || curr_box == 10 || curr_box == 11) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 5 || curr_box == 9) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = -1;
    right = curr_box + 1;
  } else if (curr_box == 1) {
    up = -1;
    down = curr_box + GridSize;
    left = -1;
    right = curr_box + 1;
  } else if (curr_box == 13) {
    up = curr_box - GridSize;
    down = -1;
    left = -1;
    right = curr_box + 1;
  } else if (curr_box == 4) {
    up = -1;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = -1;
  } else if (curr_box == 2 || curr_box == 3) {
    up = -1;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 3) {
    up = -1;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 8 || curr_box == 12) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = -1;
  } else if (curr_box == 16) {
    up = curr_box - GridSize;
    down = -1;
    left = curr_box - 1;
    right = -1;
  } else if (curr_box == 14 || curr_box == 15) {
    up = curr_box - GridSize;
    down = -1;
    left = curr_box - 1;
    right = curr_box + 1;
  }

  ret_list = new Array(up, down, left, right);
  return ret_list;
}

//make computer move after
function ComputerMove() {
  console.log("player's move registered, about to make computer move");

  for (let i = 0; i < board.size; i++) {
    if (board[i].count == 3) {
      console.log("there were 3 lines available, about to make bestMove");
      bestMove(i); //called when there is a winning line available
    }
  }

  for (let j = 0; j < board.length; j++) {
    //j is the curr box
    if (board[j].count == 1) {
      console.log("count was 1, making random move in this box");
      //check for attached boxes, if any of them are 2, continue
      was_two = 000; //flag to keep track of if neighbours have 2
      attached = getAttached(j);
      for (i in attached) {
        if (i != -1) {
          if (board[i].count == 2) was_two = 111;
          break;
        } else {
          continue;
        }
      }

      if ((was_two = 111)) {
        continue;
      } else {
        randomMove(j);
        return;
      }
    } else {
      //********** CALL RANDOM MOVE WITH A MATH.RANDOM AVAILABLE SPOT IN BOX NOT FILLED  **************
      randomMove();
    }
  }
}

function bestMove(pos) {
  side = possibleMoves(board[pos])[0];
  winningMove = Move;
  winningMove.boxNum1 = pos;
  winningMove.move1 = side;
  winningMove.player = "computer";
  //  winningMove.boxNum2 = pos;
  // winningMove.move2 = side;
  //TODO Make A function that changes the neightbor side
  boardUpdate(winningMove);
  ComputerMove();
}

function randomMove(box_num) {
  randMove = Move;
  randMove.boxNum1 = box_num;

  side = possibleMoves(board[box_num])[0];
  RandMove = Move;
  RandMove.boxNum1 = box_num;
  RandMove.move1 = side;
  RandMove.player = "computer";
  //  winningMove.boxNum2 = pos;
  // winningMove.move2 = side;
  //TODO Make A function that changes the neightbor side
  boardUpdate(randMove);
}

function reset() {}

function endGame() {
  gameRunning = 0;
}
