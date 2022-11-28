// FUNCTION CALLING
const maxCells = 4; // 2 x 2 grid
const GridSize = 4;
var currentPlayer = 1;
const gameState = [];
const boxFilled = []; // keep track of which boxes were filled
const boxNotFilled = Array.from({ length: maxCells * maxCells }, (_, i) => i + 1);

var score1 = 0;
var score2 = 0;

var move = 1; // odd = human, even = AI
color = "red";

const Move = new Object();
Move.player = "player";
Move.boxNum1 = -1;
Move.move1 = -1; //default -1, change to 0,1,2 or 3
Move.boxNum2 = -1;
Move.move2 = -1; //default -1, change to 0,1,2 or 3

initializeGameState();
createGameBoard();

// FUNCTIONS
function createGameBoard() {
  const container = document.getElementById("container");
  const table = document.createElement("table");
  table.id = "my-grid";
  table.style.border = "1px solid black";

  var cell_counter = 1;

  for (var r = 1; r <= maxCells; r++) {
    const row = document.createElement("tr");

    for (var c = 1; c <= maxCells; c++) {
      const td = document.createElement("td");
      var cell = createCell(cell_counter);
      cell_counter++;
      td.appendChild(cell);
      row.appendChild(td);
    }
    table.appendChild(row);
  }

  container.appendChild(table);

  formatTable();
}

function formatTable() {
  for (var i = 1; i <= maxCells * maxCells - maxCells; i++) {
    document.getElementById(i).getElementsByClassName("down")[0].style.display = "None";
  }

  var i = 1;
  for (var r = 1; r <= maxCells; r++) {
    for (j = i; j <= maxCells - 1; j++) {
      document.getElementById(j).getElementsByClassName("right")[0].style.width = "5px";
      console.log(j);
    }
    i += 3;
  }
}

function createCell(cell_counter) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("id", cell_counter);

  const up = document.createElement("div");
  up.classList.add("up");
  up.classList.add("0");
  addOnClick(up, 0, cell_counter);

  const left = document.createElement("div");
  left.classList.add("left");
  left.classList.add("2");
  addOnClick(left, 2, cell_counter);

  const down = document.createElement("div");
  down.classList.add("down");
  down.classList.add("1");
  addOnClick(down, 1, cell_counter);

  const right = document.createElement("div");
  right.classList.add("right");
  right.classList.add("3");
  addOnClick(right, 3, cell_counter);

  cell.appendChild(up);
  cell.appendChild(left);
  cell.appendChild(down);
  cell.appendChild(right);

  return cell;
}

function bestMove(pos) {
  side = possibleMoves(pos)[0];
  console.log("check size from bestMove " + side);
  document.getElementById(pos).getElementsByClassName(side)[0].click();

  // clicked and won so called computerMove

  ComputerMove();
}

function randomMove(box_num) {
  side = possibleMoves(box_num)[0];
  document.getElementById(box_num).getElementsByClassName(side)[0].click();
}

function getAttached(curr_box) {
  //1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
  up = 0;
  down = 0;
  left = 0;
  right = 0;
  if (curr_box == 6 || curr_box == 7 || curr_box == 10 || curr_box == 11) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 5 || curr_box == 9) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    right = curr_box + 1;
  } else if (curr_box == 1) {
    down = curr_box + GridSize;
    right = curr_box + 1;
  } else if (curr_box == 13) {
    up = curr_box - GridSize;
    right = curr_box + 1;
  } else if (curr_box == 4) {
    down = curr_box + GridSize;
    left = curr_box - 1;
  } else if (curr_box == 2 || curr_box == 3) {
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 3) {
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 8 || curr_box == 12) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = curr_box - 1;
  } else if (curr_box == 16) {
    up = curr_box - GridSize;
    left = curr_box - 1;
  } else if (curr_box == 14 || curr_box == 15) {
    up = curr_box - GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  }

  ret_list = new Array(up, down, left, right);
  return ret_list;
}

//make computer move after
function ComputerMove() {
  console.log("player's move registered, about to make computer move");

  for (let i = 1; i <= maxCells * maxCells; i++) {
    if (gameState[i].filled == 3) {
      console.log("there were 3 lines available, about to make bestMove");
      bestMove(i); //called when there is a winning line available
    }
  }

  for (let j = 1; j <= maxCells * maxCells; j++) {
    //j is the curr box
    if (gameState[j].filled == 1) {
      console.log("count was 1, making random move in this box");
      //check for attached boxes, if any of them are 2, continue
      was_two = 000; //flag to keep track of if neighbours have 2
      attached = getAttached(j);

      // check all neighbors
      for (i in attached) {
        if (i != 0) {
          if (gameState[i].filled == 2) {
            was_two = 111;
            break;
          }
        } else {
          continue;
        }
      }

      if (was_two == 111) {
        continue;
      } else {
        randomMove(j);
        return;
      }
    } else {
      //********** CALL RANDOM MOVE WITH A MATH.RANDOM AVAILABLE SPOT IN BOX NOT FILLED  **************
      console.log("calling random");
      const randomIndex = Math.floor(Math.random() * boxNotFilled.length) + 1;
      randomMove(randomIndex);
      return;
    }
  }
}

function addOnClick(element, side, id) {
  element.addEventListener("click", function (event) {
    // only update gameState if edge is not already clicked
    if (gameState[id].sides[side] == 0) {
      element.style.setProperty("background-color", color);

      gameState[id].sides[side] = 1; // update the side that was actually clicked
      gameState[id].filled++;

      const filled = checkedFilled(id, color);
      updateSurrounding(id, side, color);

      if (filled != 4) {
        currentPlayer = currentPlayer == 1 ? "2" : "1";
        color = currentPlayer == 1 ? "red" : "blue"; // toggle color
        setTimeout(function () {
          document.getElementById("currentPlayer").innerHTML = currentPlayer;
        }, 1000);
      } else {
        element.style.setProperty("background-color", color);
      }
    }
  });
}

function updateSurrounding(id, side, color) {
  // if we clicked up
  if (side == 0) {
    if (id - maxCells > 0) {
      var newId = id - maxCells;
      gameState[newId].sides[1] = 1; // force bottom of the the cell above
      gameState[newId].filled++;
      document.getElementById(newId).getElementsByClassName("down")[0].style.backgroundColor =
        color;

      checkedFilled(newId, color);
    }

    // if we clicked bottom
  } else if (side == 1) {
    if (id + maxCells <= maxCells * maxCells) {
      var newId = id + maxCells;
      gameState[newId].sides[0] = 1; // force top of the the cell above
      gameState[newId].filled++;
      document.getElementById(newId).getElementsByClassName("up")[0].style.backgroundColor = color;

      checkedFilled(newId, color);
    }

    // if we clicked left
  } else if (side == 2) {
    if ((id - 1) % maxCells > 0) {
      var newId = id - 1;
      gameState[newId].sides[3] = 1; // force right of the the cell above
      gameState[newId].filled++;
      document.getElementById(newId).getElementsByClassName("right")[0].style.backgroundColor =
        color;

      checkedFilled(newId, color);
    }

    // if we clicked right
  } else {
    if (id % maxCells != 0) {
      var newId = id + 1;
      gameState[newId].sides[2] = 1; // force left of the the cell to the right
      gameState[newId].filled++;
      document.getElementById(newId).getElementsByClassName("left")[0].style.backgroundColor =
        color;

      checkedFilled(newId, color);
    }
  }
}

function initializeGameState() {
  for (var i = 1; i <= maxCells * maxCells; i++) {
    gameState[i] = { box: i, sides: [0, 0, 0, 0], filled: 0 };
  }
}

function checkedFilled(id, color) {
  if (gameState[id].filled == 4) {
    boxFilled.push(id);
    boxNotFilled.pop(id);
    currentPlayer == 1 ? score1++ : score2++;
    document.getElementById("score1").innerHTML = score1;
    document.getElementById("score2").innerHTML = score2;

    document.getElementById(id).style.backgroundColor = color;
  }

  return gameState[id].filled == 4;
}

function possibleMoves(pos) {
  moves = new Array();
  console.log("pos: " + pos);
  console.log(JSON.stringify(gameState[pos].sides));
  for (let i = 0; i < 3; i++) {
    if (gameState[pos].sides[i] == 0) {
      moves.push(i);
    }
  }
  return moves;
}
