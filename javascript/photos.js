document.addEventListener("DOMContentLoaded", () => {
    // Select all images inside award entries
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", () => openZoom(img));
    });

    // Listen for the back button press on mobile
    window.addEventListener("popstate", (event) => {
        closeZoom();
    });
});

// Create overlay for zoom effect
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

let zoomedImage = null;

function openZoom(img) {
    if (zoomedImage) return; // Prevent multiple zoomed images

    // Push a new state into history
    history.pushState({ zoomed: true }, "");

    // Create zoomed image
    zoomedImage = document.createElement("img");
    zoomedImage.src = img.src;
    zoomedImage.className = "zoomed-image";

    // Append image to body
    document.body.appendChild(zoomedImage);

    // Activate overlay
    overlay.classList.add("active-overlay");

    // Close zoom only when clicking on overlay
    overlay.addEventListener("click", closeZoom);
}

function closeZoom() {
    if (zoomedImage) {
        zoomedImage.remove();
        zoomedImage = null;
        overlay.classList.remove("active-overlay");

        // Go back in history when zoom is closed
        history.back();
    }
}
