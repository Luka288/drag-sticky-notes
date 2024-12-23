const card = document.querySelectorAll(".card");
const addNote = document.querySelector(".addNote");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeX = document.querySelector(".closeX");
const noteInput = document.querySelector("#noteTitle");
const form = document.querySelector(".inputForm");
const container = document.querySelector(".container");

const stickyColors = [
  "#FFEB3B",
  "#FFCDD2",
  "#BBDEFB",
  "#C8E6C9",
  "#FFE0B2",
  "#E1BEE7",
  "#FFFFFF",
  "#FF8A80",
];

let newX = 0;
let newY = 0;
let startX = 0;
let startY = 0;
let draggedCard = null;

container.addEventListener("mousedown", (e) => {
  if (e.target.closest(".card")) {
    // Using closest to handle clicks on inner elements
    mouseDown(e);
  }
});

function mouseDown(e) {
  draggedCard = e.target.closest(".card");
  draggedCard.style.zIndex = "201";

  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  if (!draggedCard) return;

  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  draggedCard.style.left = draggedCard.offsetLeft - newX + "px";
  draggedCard.style.top = draggedCard.offsetTop - newY + "px";
}

function mouseUp(e) {
  document.removeEventListener("mousemove", mouseMove);
  draggedCard.style.zIndex = "200";
  draggedCard = null;
}

addNote.addEventListener("click", () => {
  modal.classList.toggle("active");
  overlay.classList.toggle("activeOverlay");
});

closeX.addEventListener("click", () => {
  if (
    modal.classList.contains("active") &&
    overlay.classList.contains("activeOverlay")
  ) {
    modal.classList.remove("active");
    overlay.classList.remove("activeOverlay");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!noteInput.value) {
    return;
  }
  createNote(noteInput.value);
});

function createNote(noteTitle) {
  const div = document.createElement("div");
  const p = document.createElement("p");

  const randomColor = stickyColors[generateRandomIndex(stickyColors)];

  div.classList.add("card");
  div.style.backgroundColor = randomColor;

  p.textContent = noteTitle;

  div.appendChild(p);
  container.appendChild(div);

  noteInput.value = "";
}

function generateRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}
