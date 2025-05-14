async function fetchWeapons() {
    try {
        const response = await fetch("https://valorant-api.com/v1/weapons");
        const data = await response.json();

        let WeaponName = window.location.hash.slice(1);

        if (WeaponName === "") {
            WeaponName = "classic";
        }
        window.document.querySelector(".active").classList.remove("active");
        window.document.querySelector("." + WeaponName).classList.add("active");

        const skinsDiv = window.document.querySelector(".skins");

        skinsDiv.innerHTML = "";

        data.data.forEach((weapon) => {
            if (weapon.displayName.toLowerCase() === WeaponName) {
                let skins = weapon.skins;
                let first = skins[0];

                updateSkin(first);

                // Create Skins List
                skins.forEach((skin) => {
                    if (skin.displayName.includes('Random')) {
                        return;
                    };
                    if (skin.displayName.includes('Standard')) {
                        return;
                    };

                    const img = document.createElement("img");
                    img.src = skin.chromas[0].fullRender;
                    img.onclick = (e) => {
                        updateSkin(skin);
                        document.querySelector(".button-selected").classList.remove("button-selected");
                        img.parentElement.parentElement.classList.add("button-selected");
                    };
                    const imgContainer = document.createElement("div");
                    imgContainer.appendChild(img);
                    imgContainer.classList.add("skins-img");

                    const Corner1 = document.createElement("div");
                    Corner1.classList.add("c1");
                    const Corner2 = document.createElement("div");
                    Corner2.classList.add("c2");
                    const Corner3 = document.createElement("div");
                    Corner3.classList.add("c3");
                    const Corner4 = document.createElement("div");
                    Corner4.classList.add("c4");

                    const styledButton = document.createElement("div");
                    styledButton.classList.add("styled-button");
                    styledButton.appendChild(imgContainer);
                    styledButton.appendChild(Corner1);
                    styledButton.appendChild(Corner2);
                    styledButton.appendChild(Corner3);
                    styledButton.appendChild(Corner4);

                    if (skin.displayName === first.displayName) {
                        styledButton.classList.add("button-selected");
                    }

                    skinsDiv.appendChild(styledButton);
                });

            }
        });
    } catch (error) {
        console.error("Error fetching weapons:", error);
    }
}

function updateSkin(skin) {
    window.document.getElementById("preview").src = skin.chromas[0].fullRender;
    document.querySelector(".preview>h1").textContent = skin.displayName.toUpperCase();

    // Add Wallpaper
    const wallpaperContainer = window.document.querySelector(".wallpaper-container");
    wallpaperContainer.innerHTML = "";

    if (skin.wallpaper === null) {
    }
    else {
        const wallpaper = document.createElement('img');
        wallpaper.src = skin.wallpaper;
        
        wallpaperContainer.appendChild(wallpaper);
    };

    const levelsDiv = window.document.querySelector(".levels");
    const variantDiv = window.document.querySelector(".variants");

    levelsDiv.innerHTML = "";
    variantDiv.innerHTML = "";

    // Create Levels Buttons
    if (skin.levels.length > 1) {
        skin.levels.forEach((level) => {
            const img = document.createElement("img");
            img.src = level.displayIcon;
            img.onclick = (e) => {
                popup(level.streamedVideo, level.displayName);
            }
            const imgContainer = document.createElement("div");
            imgContainer.appendChild(img);
            imgContainer.classList.add("img-container");

            const Corner1 = document.createElement("div");
            Corner1.classList.add("c1");
            const Corner2 = document.createElement("div");
            Corner2.classList.add("c2");
            const Corner3 = document.createElement("div");
            Corner3.classList.add("c3");
            const Corner4 = document.createElement("div");
            Corner4.classList.add("c4");

            const styledButton = document.createElement("div");
            styledButton.classList.add("styled-button");
            styledButton.appendChild(imgContainer);
            styledButton.appendChild(Corner1);
            styledButton.appendChild(Corner2);
            styledButton.appendChild(Corner3);
            styledButton.appendChild(Corner4);

            levelsDiv.appendChild(styledButton);
        });
    }


    // Create Variants Buttons
    const first = skin.chromas[0];
    if (skin.chromas.length > 1) {
        skin.chromas.forEach((chromas) => {
            const img = document.createElement("img");
            img.src = chromas.swatch;
            img.onclick = (e) => {
                window.document.getElementById("preview").src = chromas.fullRender;
                document.querySelector(".variant-selected").classList.remove("variant-selected");
                img.parentElement.parentElement.classList.add("variant-selected");
            };
            const imgContainer = document.createElement("div");
            imgContainer.appendChild(img);
            imgContainer.classList.add("img-container");

            const Corner1 = document.createElement("div");
            Corner1.classList.add("c1");
            const Corner2 = document.createElement("div");
            Corner2.classList.add("c2");
            const Corner3 = document.createElement("div");
            Corner3.classList.add("c3");
            const Corner4 = document.createElement("div");
            Corner4.classList.add("c4");

            const styledButton = document.createElement("div");
            styledButton.classList.add("styled-button");
            styledButton.appendChild(imgContainer);
            styledButton.appendChild(Corner1);
            styledButton.appendChild(Corner2);
            styledButton.appendChild(Corner3);
            styledButton.appendChild(Corner4);

            if (chromas === first) {
                styledButton.classList.add("variant-selected");
            }

            variantDiv.appendChild(styledButton);
        });
    }
}

// Create Video Popup
function popup(videoURL, levelName) {
    const videoSource = document.createElement('source');
    videoSource.src = videoURL

    const levelVideo = document.createElement('video');
    levelVideo.classList.add('level-video');
    levelVideo.appendChild(videoSource);
    levelVideo.autoplay = "true";
    levelVideo.controls = "ture";

    const levelText = document.createElement('h2');
    levelText.textContent = levelName;

    const popupContainer = document.createElement('div');
    popupContainer.classList.add("popup-container");
    popupContainer.appendChild(levelVideo);
    popupContainer.appendChild(levelText);

    document.getElementsByTagName('main')[0].appendChild(popupContainer);

    // To close popup window
    let isHovered = false;
    window.addEventListener(
        "mousedown",
        (event) => {
            if (isHovered) return;
            console.log(!isHovered);
            document.getElementsByTagName('main')[0].removeChild(popupContainer);

            event.preventDefault();
        },
        { passive: false }
    );

    popupContainer.addEventListener("mouseenter", () => (isHovered = true));
    popupContainer.addEventListener("mouseleave", () => (isHovered = false));
}


let skinsHeight = null;
let buttonState = false;

function showMore() {
    const button = document.getElementById('show-more');
    const skins = document.querySelector(".skins");
    if (skinsHeight === null) {
        skinsHeight = skins.style.height
    }
    if (buttonState) {
        button.textContent = 'Show Less'
    } else {
        button.textContent = 'Show More'
    }
    buttonState = !buttonState;
    skins.style.height = buttonState ? "inherit" : skinsHeight;
}

/* Scroll source: https://stackoverflow.com/questions/28576636*/

let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelector(".menu");

const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};

const stopDragging = (e) => {
    mouseDown = false;
};

const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
        return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
};

// Add the event listeners
slider.addEventListener("mousemove", move, false);
slider.addEventListener("mousedown", startDragging, false);
slider.addEventListener("mouseup", stopDragging, false);
slider.addEventListener("mouseleave", stopDragging, false);

/* --------------------------------------------------------------------------*/

// Lets scroll horizontal while hovering menu
let isHovered = false;

window.addEventListener(
    "wheel",
    (event) => {
        if (!isHovered) return;
        console.log(isHovered);
        slider.scrollLeft += event.deltaY * 0.5;

        event.preventDefault();
    },
    { passive: false }
);

slider.addEventListener("mouseenter", () => (isHovered = true));
slider.addEventListener("mouseleave", () => (isHovered = false));

fetchWeapons();
