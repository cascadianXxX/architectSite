
const videoPopup = document.getElementById('videoPopup');
const closePopup = document.getElementById('closePopup');
const popupVideo = document.getElementById('popupVideo');

function closeVideoPopup() {
  popupVideo.pause();
  popupVideo.currentTime = 0;
  videoPopup.style.display = 'none';
}

closePopup.addEventListener('click', closeVideoPopup);

videoPopup.addEventListener('click', function(e) {
  if (e.target === videoPopup) {
    closeVideoPopup();
  }
});

window.addEventListener('load', function() {
  history.pushState(null, '', window.location.pathname);
  videoPopup.style.display = 'flex';
  popupVideo.muted = false;
  popupVideo.volume = 0.2;
  popupVideo.play().catch(e => {
    console.log("Otomatik oynatma engellendi:", e);
  });
});

window.addEventListener('popstate', function(e) {
  if (videoPopup.style.display !== 'none') {
    closeVideoPopup();
    history.pushState(null, '', window.location.pathname);
    e.preventDefault();
  }
});