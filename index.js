// FUNCTION CALLING
const boxes = 4;
createGameBoard();

// FUNCTIONS
function createGameBoard() {
  console.log("creating game board");
  const container = document.getElementById("container");
  const table = document.createElement("table");
  table.id = "my-grid";
  table.style.border = "1px solid black";

  var cell_counter = 1;

  for (var r = 1; r <= boxes / 2; r++) {
    const row = document.createElement("tr");

    for (var c = 1; c <= boxes / 2; c++) {
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
  element.addEventListener("click", () => {
    console.log(className + "-" + id);
  });
}

function checkList() {}
