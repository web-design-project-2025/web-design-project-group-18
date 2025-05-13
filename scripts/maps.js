var slideIndex = 1;
var dots = document.querySelectorAll(".pagination span");
const mapNames = ["SPLIT", "FRACTURE", "BIND", "HAVEN", "SUNSET"];
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function currentDiv(n) {
  showDivs((slideIndex = n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var titleElement = document.getElementById("mapTitle");

  if (n > x.length) slideIndex = 1;
  if (n < 1) slideIndex = x.length;

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  x[slideIndex - 1].style.display = "block";

  if (titleElement) {
    titleElement.textContent = mapNames[slideIndex - 1];
  }

  if (typeof dots !== "undefined") {
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-red", "");
    }
    dots[slideIndex - 1].className += " w3-red";
  }

  dots.forEach((dot) => dot.classList.remove("active"));

  dots[slideIndex - 1].classList.add("active");
}
// Add this array mapping slide indexes to map IDs
const mapIds = ["split", "fracture", "bind", "haven", "sunset"];

// Add click handler to map container
document.querySelector(".map-container").addEventListener("click", function () {
  const mapId = mapIds[slideIndex - 1];
  window.location.href = `mapsDT.html?map=${mapId}`;
});
