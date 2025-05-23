document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mapId = urlParams.get("map") || "split";

  fetch("data/maps.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedMap = data.maps.find((map) => map.id === mapId);
      renderMapContent(selectedMap);
      updateActiveNav(mapId);
    })
    .catch((error) => console.error("Error loading maps:", error));
});

function renderMapContent(mapData) {
  const contentContainer = document.getElementById("content-container");

  const template = `
      <div class="detail-map-content">
        <div class="detail-map-text">
          <h2>${mapData.title}</h2>
          <p1>${mapData.coordinates}</p1>
          <p>${mapData.description}</p>
          <div class="small-images-grid">
            ${generateSmallImages(mapData)}
          </div>
        </div>
        <div class="detail-map-visual">
          <img src="${mapData.mainImage}" alt="${mapData.title} Map">
        </div>
      </div>
    `;

  contentContainer.innerHTML = template;
}

function generateSmallImages(mapData) {
  if (!mapData.smallImages || mapData.smallImages.length === 0) {
    return "<div>No additional images available</div>";
  }

  return mapData.smallImages
    .map(
      (image) => `
      <img src="${image.src}" alt="${image.alt}" class="small-image">
    `
    )
    .join("");
}
