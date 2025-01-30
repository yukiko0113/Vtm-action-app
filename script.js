// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialisation de GSAP et des plugins
  gsap.registerPlugin(ScrollTrigger, Draggable);

  // Configuration de base pour GSAP
  gsap.defaults({
    ease: "power2.out",
    duration: 0.3
  });

  // Configuration pour le menu draggable
  const menu = document.querySelector('.dragMenu');
  if (menu) {
    Draggable.create(menu, {
      bounds: {
        minX: 0,
        maxX: container.scrollWidth - container.clientWidth,
        minY: 0,
        maxY: 0
      },
      snap: {
        points: Array.from({ length: 5 }, (_, i) => i * (window.innerWidth * 0.25)),
        duration: 0.3,
        ease: "power2.out"
      },
      onDragStart: () => {
        document.body.style.cursor = 'grabbing';
        event.preventDefault();
      },
      onDragEnd: () => {
        document.body.style.cursor = 'grab';
        gsap.to(menu, {
          x: () => {
            const menuRect = menu.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            return Math.round(menuRect.left / containerRect.width) * containerRect.width;
          },
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  }

  // Configuration pour les tooltips
  const tooltipTrigger = document.getElementById('tooltip-trigger');
  const tooltipContainer = document.querySelector('.tooltip-content');

  if (tooltipTrigger && tooltipContainer) {
    function loadTooltipContent() {
      fetch('Contenu-tooltips.html')
        .then(response => response.text())
        .then(data => {
          tooltipContainer.innerHTML = data;
          const tooltipVideo = document.getElementById('tooltip-video');
          
          if (tooltipVideo) {
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
          }
        })
        .catch(error => console.error('Erreur lors du chargement du contenu des tooltips:', error));
    }

    tooltipTrigger.addEventListener('click', function(event) {
      event.stopPropagation();
      if (tooltipContainer.style.display === 'block') {
        tooltipContainer.style.display = 'none';
        const tooltipVideo = document.getElementById('tooltip-video');
        if (tooltipVideo) tooltipVideo.pause();
      } else {
        tooltipContainer.style.display = 'block';
        loadTooltipContent();
      }
    });

    document.addEventListener('click', function(event) {
      if (!tooltipTrigger.contains(event.target) && !tooltipContainer.contains(event.target)) {
        tooltipContainer.style.display = 'none';
        const tooltipVideo = document.getElementById('tooltip-video');
        if (tooltipVideo) tooltipVideo.pause();
      }
    });
  }
});