// FUNCTION CALLING
const maxCells = 3; // 2 x 2 grid
var currentPlayer = 1;
const gameState = [];
const boxFilled = []; // keep track of which boxes were filled
const score1 = 0;
const score2 = 0;

/* 	Sample:
	gameState = [
		{box: 1, sides: {left: 1}, filled: true}
		{box: 2, sides: {}, filled: false}
		{box: 3, sides: {}, filled: false}
		{box: 4, sides: {left: 1}, filled: false}}
	]
*/

while (score1 + score2 < 9) {
  initializeGameState();
  createGameBoard();
}

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

function createCell(cell_counter) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("id", cell_counter);

  const up = document.createElement("div");
  up.classList.add("up");
  addOnClick(up, "up", cell_counter);

  const left = document.createElement("div");
  left.classList.add("left");
  addOnClick(left, "left", cell_counter);

  const down = document.createElement("div");
  down.classList.add("down");
  addOnClick(down, "down", cell_counter);

  const right = document.createElement("div");
  right.classList.add("right");
  addOnClick(right, "right", cell_counter);

  cell.appendChild(up);
  cell.appendChild(left);
  cell.appendChild(down);
  cell.appendChild(right);

  return cell;
}

function addOnClick(element, className, id) {
  element.addEventListener("click", function (event) {
    // only update gameState if edge is not already clicked
    if (gameState[id].sides[className] != 1) {
      currentPlayer = currentPlayer == 1 ? 2 : 1;
      gameState[id].sides[className] = 1; // add side to gameState

      color = currentPlayer == 1 ? "red" : "blue"; // toggle color
      element.style.setProperty("background-color", color);

      if (Object.keys(gameState[id].sides).length == 4) {
        gameState[id].filled = currentPlayer;
        boxFilled.push(id);
        currentPlayer == 1 ? score1++ : score2;
        document.getElementById(id).style.backgroundColor = color;
      }
    }
  });
}

function initializeGameState() {
  for (var i = 1; i <= maxCells * maxCells; i++) {
    gameState.push({ box: i, sides: {}, filled: 0 });
  }
}
