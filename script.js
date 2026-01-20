const DEFAULT_NUMBER_OF_CELLS_PER_SIDE = 16;

const enterButton = document.querySelector(".enter-btn");
const grid = document.querySelector(".container");
const blackColorButton = document.querySelector(".black-btn");
const colorPicker = document.querySelector(".color-picker");
const randomColorsButton = document.querySelector(".random-colors-btn");
const eraser = document.querySelector(".eraser");
const clearButton = document.querySelector(".clear-btn");

const state = {
  color: "black",
  coloring: false,
  randomColoring: false,
};

if (state.color === "black") blackColorButton.classList.add("black-btn-active");

function getRandomHexColor() {
  const hex =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  return hex;
}

function createCell(cellSideLengthPercentage) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = cell.style.height = `${cellSideLengthPercentage}%`;

  cell.addEventListener("mouseenter", (e) => {
    if (!state.coloring) return;
    e.target.style.backgroundColor = state.randomColoring
      ? getRandomHexColor()
      : state.color;
  });

  grid.appendChild(cell);
}

function populateGrid(cellsPerSide = DEFAULT_NUMBER_OF_CELLS_PER_SIDE) {
  const totalCells = cellsPerSide ** 2;
  const cellSideLengthPercentage = 100 / cellsPerSide;

  for (let i = 1; i <= totalCells; i++) {
    createCell(cellSideLengthPercentage);
  }
}

populateGrid();

function resetBlackButtonStyles() {
  blackColorButton.classList.remove("black-btn-active");
}

function resetRandomColorsButton() {
  randomColorsButton.classList.remove("random-colors-btn-active");
  state.randomColoring = false;
}

enterButton.addEventListener("click", () => {
  const inputValue = parseInt(document.querySelector("#nb-of-cells").value, 10);
  const numOfCells =
    inputValue >= 16 && inputValue <= 100
      ? inputValue
      : DEFAULT_NUMBER_OF_CELLS_PER_SIDE;
  grid.innerHTML = "";
  populateGrid(numOfCells);
});

blackColorButton.addEventListener("click", () => {
  state.color = "black";
  blackColorButton.classList.add("black-btn-active");
  grid.classList.remove("grid-eraser-mode");
  resetRandomColorsButton();
});

colorPicker.addEventListener("change", (e) => {
  state.color = e.target.value;
  grid.classList.remove("grid-eraser-mode");
  resetBlackButtonStyles();
  resetRandomColorsButton();
});

randomColorsButton.addEventListener("click", () => {
  console.log("coloring:", state.coloring);
  randomColorsButton.classList.add("random-colors-btn-active");
  state.randomColoring = true;
  grid.classList.remove("grid-eraser-mode");
  resetBlackButtonStyles();
});

eraser.addEventListener("click", () => {
  state.color = "white";
  grid.classList.add("grid-eraser-mode");
  resetBlackButtonStyles();
  resetRandomColorsButton();
});

clearButton.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.style.backgroundColor = "white"));
  grid.classList.remove("grid-eraser-mode");
  resetBlackButtonStyles();
  resetRandomColorsButton();
});

grid.addEventListener("mousedown", (e) => {
  state.coloring = true;
  if (e.target.classList.contains("cell")) {
    e.target.style.backgroundColor = state.color;
  }
});

grid.addEventListener("mouseup", () => (state.coloring = false));
grid.addEventListener("mouseleave", () => (state.coloring = false));
