// FUNCTION CALLING
const maxCells = 4; // 2 x 2 grid
var currentPlayer = 1;
const gameState = [];
const boxFilled = []; // keep track of which boxes were filled
const boxNotFilled = Array.from({ length: maxCells * maxCells }, (_, i) => i + 1);

var score1 = 0;
var score2 = 0;

var move = 1; // odd = human, even = AI

/* 	Sample:
	gameState = [
		{box: 1, sides: {left: 1}, filled: 1}
		{box: 2, sides: {}, filled: false}
		{box: 3, sides: {}, filled: false}
		{box: 4, sides: {left: 1}, filled: 1}}
	]
*/

initializeGameState();
createGameBoard();

// FUNCTIONS
function createGameBoard() {
  console.log("creating game board");
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
}

function formatTable() {
  for (var i = 0; i < maxCells * maxCells - maxCells; i++) {
    document.getElementById("");
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

function addOnClick(element, side, id) {
  element.addEventListener("click", function (event) {
    // only update gameState if edge is not already clicked
    if (gameState[id].sides[side] == 0) {
      console.log("clicked box " + id + "- side " + side);
      move++;
      currentPlayer = currentPlayer == 1 ? 2 : 1;

      color = currentPlayer == 1 ? "red" : "blue"; // toggle color
      element.style.setProperty("background-color", color);

      gameState[id].sides[side] = 1; // update the side that was actually clicked
      gameState[id].filled++;

      checkedFilled(id, color);

      updateSurrounding(id, side, color);

      document.getElementById("currentPlayer").innerHTML = currentPlayer == 1 ? "2" : "1";
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
    if ((id - 1) % maxCells >= 0) {
      var newId = id - 1;
      gameState[newId].sides[3] = 1; // force right of the the cell above
      gameState[newId].filled++;
      document.getElementById(newId).getElementsByClassName("right")[0].style.backgroundColor =
        color;

      checkedFilled(newId, color);
    }

    // if we clicked right
  } else {
    if ((id + 1) % maxCells <= maxCells) {
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
    // gameState.push({ box: i, sides: [0, 0, 0, 0], filled: 0 });
  }

  console.log(JSON.stringify(gameState, null, 2));
}

function checkedFilled(id, color) {
  if (gameState[id].filled == 4) {
    boxFilled.push(id);
    boxNotFilled.pop(id);
    currentPlayer == 1 ? score1++ : score2++;
    document.getElementById(id).style.backgroundColor = color;
  }
}

function randomizedMove() {
  const randomIndex = Math.floor(Math.random() * boxNotFilled.length);
  const pickedBoxId = boxNotFilled[randomIndex];
  const moves = possibleMoves(gameState[pickedBoxId], pickedBoxId);

  const pickedSide = Math.floor(Math.random() * moves.length);

  console.log("AI picked box " + boxNotFilled[randomIndex] + " - side: " + moves[pickedSide]);
  document
    .getElementById(boxNotFilled[randomIndex])
    .getElementsByClassName(moves[pickedSide].toString())[0]
    .click();
}

function possibleMoves(box, id) {
  moves = new Array();
  for (let i = 0; i < 4; i++) {
    console.log(JSON.stringify(box));
    if (box.sides[i] == 0) {
      moves.push(i);
    }
  }
  return moves; // up, down, left, right
}
