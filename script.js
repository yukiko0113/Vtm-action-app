document.addEventListener('DOMContentLoaded', function() {
  const tooltipTrigger = document.getElementById('tooltip-trigger');
  const tooltipContainer = document.getElementById('portrait');

  if (!tooltipTrigger || !tooltipContainer) {
    console.error('Erreur : élément tooltip-trigger ou portrait non trouvé.');
    return;
  }

  // Fonction pour charger le contenu des tooltips
  function loadTooltipContent() {
    fetch('Contenu-tooltips.html')
      .then(response => response.text())
      .then(data => {
        tooltipContainer.innerHTML = data;
        const tooltipVideo = document.getElementById('tooltip-video');
        
        if (tooltipVideo) {
          // Configurer la vidéo pour qu'elle démarre à 0
          tooltipVideo.currentTime = 0;
          tooltipVideo.play();

          let firstPlay = true;

          tooltipVideo.addEventListener('timeupdate', function() {
            if (firstPlay && tooltipVideo.currentTime >= tooltipVideo.duration - 1) {
              firstPlay = false;
              tooltipVideo.currentTime = 10;
              tooltipVideo.loop = true;
              tooltipVideo.play();
            } else if (!firstPlay && tooltipVideo.currentTime >= tooltipVideo.duration - 1) {
              tooltipVideo.currentTime = 10;
            }
          });
        } else {
          console.error('Erreur : élément vidéo non trouvé.');
        }
      })
      .catch(error => console.error('Erreur lors du chargement du contenu des tooltips:', error));
  }

  // Toggle tooltip visibility on click
  tooltipTrigger.addEventListener('click', function(event) {
    if (tooltipContainer.style.display === 'block') {
      tooltipContainer.style.display = 'none';
      const tooltipVideo = document.getElementById('tooltip-video');
      if (tooltipVideo) {
        tooltipVideo.pause();
      }
    } else {
      tooltipContainer.style.display = 'block';
      loadTooltipContent();
    }
  });

  // Fermer la tooltip si on clique en dehors
  document.addEventListener('click', function(event) {
    if (!tooltipTrigger.contains(event.target) && !tooltipContainer.contains(event.target)) {
      tooltipContainer.style.display = 'none';
      const tooltipVideo = document.getElementById('tooltip-video');
      if (tooltipVideo) {
        tooltipVideo.pause();
      }
    }
  });
});