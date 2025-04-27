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
  
  // Video özelliklerini ayarla
  popupVideo.muted = false;        // Sesi aç
  popupVideo.volume = 0.5;          // Ses seviyesi %50 yap (istersen değiştirebilirsin)
  popupVideo.loop = true;           // Loop aktif
  popupVideo.autoplay = true;       // Otomatik başlasın

  // Videoyu oynat
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
