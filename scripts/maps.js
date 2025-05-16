var slideIndex = 1;
const totalMaps = 10;
const mapNames = [
  "SPLIT",
  "FRACTURE",
  "BIND",
  "HAVEN",
  "SUNSET",
  "LOTUS",
  "ASCENT",
  "ICEBOX",
  "BREEZE",
  "ABYSS",
];
const mapIds = [
  "split",
  "fracture",
  "bind",
  "haven",
  "sunset",
  "lotus",
  "ascent",
  "icebox",
  "breeze",
  "abyss",
];

document.addEventListener("DOMContentLoaded", () => {
  showDivs(slideIndex);
  createPagination();
});

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function currentDiv(n) {
  showDivs((slideIndex = n));
}

function showDivs(n) {
  const x = document.getElementsByClassName("mySlides");
  if (n > x.length) slideIndex = 1;
  if (n < 1) slideIndex = x.length;

  Array.from(x).forEach((slide) => (slide.style.display = "none"));
  x[slideIndex - 1].style.display = "block";

  document.getElementById("mapTitle").textContent = mapNames[slideIndex - 1];
  createPagination();
}

// Pagination functions
function createPagination() {
  const container = document.getElementById("pagination-container");
  container.innerHTML = "";

  const start = slideIndex <= 5 ? 1 : 6;
  const end = slideIndex <= 5 ? 5 : 10;

  // Left arrow (only on map 6)
  if (slideIndex === 6) {
    const leftArrow = document.createElement("span");
    leftArrow.innerHTML = "◄";
    leftArrow.className = "pagination-arrow";
    leftArrow.onclick = () => {
      slideIndex = 5;
      showDivs(slideIndex);
    };
    container.appendChild(leftArrow);
  }

  // Number buttons
  for (let i = start; i <= end; i++) {
    const btn = document.createElement("span");
    btn.textContent = i;
    btn.className = i === slideIndex ? "active" : "";
    btn.onclick = () => {
      slideIndex = i;
      showDivs(slideIndex);
    };
    container.appendChild(btn);
  }

  // Right arrow (only on map 5)
  if (slideIndex === 5) {
    const rightArrow = document.createElement("span");
    rightArrow.innerHTML = "►";
    rightArrow.className = "pagination-arrow";
    rightArrow.onclick = () => {
      slideIndex = 6;
      showDivs(slideIndex);
    };
    container.appendChild(rightArrow);
  }
}

// move to detail map
document.querySelector(".map-container").addEventListener("click", function () {
  const mapId = mapIds[slideIndex - 1];
  window.location.href = `mapsDT.html?map=${mapId}`;
});
