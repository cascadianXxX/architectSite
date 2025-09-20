const image = document.getElementById('dr.alihankeskin_image');
image.addEventListener('click', function() {
    window.location.href = 'https://www.uksek.org/_files/ugd/614b1f_b38b4d68ce964033a944fd048e388920.pdf#page=24.00';
});
const image2 = document.getElementById('dau_image');
image2.addEventListener('click', function() {
    window.location.href = 'https://pr.emu.edu.tr/Documents/DAUdeGecenHafta/2024/12/20_Aralik_2024.pdf#page=2.40';
});

document.addEventListener("DOMContentLoaded", () => {
    // Select all images inside award entries
    document.querySelectorAll("#logo").forEach(img => {
        img.addEventListener("click", () => openZoom(img));
    });
});

// Create overlay for zoom effect
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

let zoomedImage = null;

function openZoom(img) {
    if (zoomedImage) return; // Prevent multiple zoomed images

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
    }
}

document.getElementById("img_1").addEventListener("click", function () {
    window.location.href = this.dataset.link;
});
document.getElementById("img_2").addEventListener("click", function () {
    window.location.href = this.dataset.link;
});