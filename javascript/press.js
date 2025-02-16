/* UTILITIES */
function toggleClass(element, className) {
    element.classList.toggle(className);
}

/* SUBCATEGORY TOGGLING */
document.addEventListener("click", (event) => {
    if (event.target.matches(".category")) {
        let subContainer = event.target.nextElementSibling;
        toggleClass(subContainer, "hidden");

        // Hide all subcategory images when closing a category
        if (subContainer.classList.contains("hidden")) {
            subContainer.querySelectorAll(".images").forEach(img => img.classList.add("hidden"));
        }
    }

    if (event.target.matches(".subcategory")) {
        let images = event.target.nextElementSibling;
        toggleClass(images, "hidden");
    }
});

/* ZOOM FUNCTIONALITY */

let zoomedImage = null;
let croppedImageSize = null;

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

function toggleZoom(img, cropValues) {
    zoomedImage ? closeZoom() : openZoom(img, cropValues);
}

function openZoom(img, cropValues) {
    // Create a canvas to crop the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const originalImage = new Image();
    originalImage.src = img.src;

    originalImage.onload = () => {
        const { width: actualWidth, height: actualHeight } = originalImage;

        // Convert crop percentages to pixel dimensions
        const [top, right, bottom, left] = cropValues.split(" ").map(val => parseFloat(val) / 100);
        const cropX = actualWidth * left;
        const cropY = actualHeight * top;
        const cropWidth = actualWidth * (1 - left - right);
        const cropHeight = actualHeight * (1 - top - bottom);

        // Set canvas size and draw cropped image
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.drawImage(originalImage, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        // Create new cropped image
        zoomedImage = document.createElement("img");
        zoomedImage.src = canvas.toDataURL();
        zoomedImage.className = "zoomed-image";

        // Save cropped image size
        croppedImageSize = { width: cropWidth, height: cropHeight };

        // Scale to fit within viewport
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        const scaleFactor = Math.min(maxWidth / cropWidth, maxHeight / cropHeight);

        // Apply final dimensions and position
        Object.assign(zoomedImage.style, {
            width: `${cropWidth * scaleFactor}px`,
            height: `${cropHeight * scaleFactor}px`,
            transform: "translate(-50%, -50%)"
        });

        document.body.appendChild(zoomedImage);
        console.log(`Cropped Image Size: ${croppedImageSize.width}px × ${croppedImageSize.height}px`);
        console.log(`Calculated Scale Factor: ${scaleFactor}`);

        requestAnimationFrame(() => {
            zoomedImage.classList.add("zoomed-in");
            overlay.classList.add("active-overlay");
        });

        // Clean up canvas
        canvas.remove();
    };
}

function closeZoom() {
    if (zoomedImage) {
        zoomedImage.classList.remove("zoomed-in");
        overlay.classList.remove("active-overlay");

        setTimeout(() => {
            zoomedImage?.remove();
            zoomedImage = null;
            croppedImageSize = null;
        }, 300);
    }
}

// Close zoom when clicking on the overlay
overlay.addEventListener("click", closeZoom);
