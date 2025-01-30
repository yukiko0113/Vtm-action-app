function setupHorizontalScroll() {
  const container = document.querySelector('.container');
  if (!container) return;

  // Configuration
  const config = {
    scrollSpeed: 0.5, // Vitesse du défilement
    snapThreshold: 0.3, // Seuil pour le snap aux sections
    friction: 0.1 // Frottement pour un arrêt naturel
  };

  // État interne
  let isScrolling = false;
  let lastScrollPosition = 0;
  let touchStartX = 0;

  // Gestion du wheel event
  container.addEventListener('wheel', handleWheel);
  
  // Gestion du touch pour les mobiles
  container.addEventListener('touchstart', handleTouchStart);
  container.addEventListener('touchmove', handleTouchMove);

  // Gestion du scroll natif
  container.addEventListener('scroll', handleScroll);

  // Fonction principale de gestion du wheel
  function handleWheel(e) {
    e.preventDefault();
    
    // Calcul du delta horizontal
    const deltaX = e.deltaX;
    const scrollAmount = deltaX * config.scrollSpeed;

    // Si déjà en train de scroll, on sort
    if (isScrolling) return;

    // Mise à jour de l'état
    isScrolling = true;
    
    // Animation fluide avec GSAP
    gsap.to(container, {
      scrollTo: {
        x: () => container.scrollLeft + scrollAmount,
        y: 0
      },
      duration: config.snapThreshold,
      ease: "power2.out",
      onComplete: () => {
        isScrolling = false;
      }
    });
  }

  // Gestion du touch pour les mobiles
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    lastScrollPosition = container.scrollLeft;
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const scrollAmount = (lastScrollPosition - (currentX - touchStartX)) * config.scrollSpeed;

    gsap.to(container, {
      scrollTo: {
        x: scrollAmount,
        y: 0
      },
      duration: config.snapThreshold,
      ease: "power2.out",
      onComplete: () => {
        lastScrollPosition = container.scrollLeft;
      }
    });
  }

  // Gestion du scroll natif
  function handleScroll() {
    // Logique pour le snap aux sections
    const scrollPosition = container.scrollLeft;
    const sections = document.querySelectorAll('section');
    
    if (sections.length === 0) return;

    const sectionWidth = sections[0].offsetWidth;
    const snapPosition = Math.round(scrollPosition / sectionWidth) * sectionWidth;

    if (Math.abs(scrollPosition - snapPosition) > sectionWidth * config.snapThreshold) {
      gsap.to(container, {
        scrollTo: {
          x: snapPosition,
          y: 0
        },
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }

  // Initialisation
  container.style.overflowX = 'scroll';
  container.style.touchAction = 'none';
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', setupHorizontalScroll);

  // Tooltip functionality
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