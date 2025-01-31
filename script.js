document.addEventListener('DOMContentLoaded', () => {
  // Initialisation de GSAP et des plugins
  gsap.registerPlugin(ScrollTrigger, Draggable);


// Configuration de la modal
const modal = document.querySelector('.modal');
const isOpen = false;
const threshold = 50; // Seuil en pixels pour l'ouverture/fermeture

// Positionnement initial de la modal en bas de l'écran
gsap.set(modal, { 
  y: window.innerHeight - modal.offsetHeight // Position initiale en bas
});

// Création du draggable
Draggable.create(modal, {
  type: "y", // Autorise le glissement vertical
  edgeResistance: 0.55, // Résistance au glissement aux bords
  bounds: {
    minY: -modal.offsetHeight + window.innerHeight, // Position maximale en haut
    maxY: window.innerHeight - modal.offsetHeight // Position initiale en bas
  },
  inertia: true, // Active l'inertie pour un glissement naturel
  onMove: function (e) {
    // Calcul de la position actuelle
    const currentY = this.y;
    
    // Si la modal n'est pas ouverte et que l'utilisateur la fait glisser vers le haut
    if (!isOpen && currentY <= this.maxY - threshold) {
      // Ouvre la modal
      this.target.classList.add("open");
      this.endDrag(); // Arrête le glissement
      gsap.to(this.target, { 
        y: this.minY, // Glisse jusqu'en haut
        duration: 0.3
      });
      isOpen = true;
    } 
    // Si la modal est ouverte et que l'utilisateur la fait glisser vers le bas
    else if (isOpen && currentY >= this.minY + threshold) {
      // Ferme la modal
      this.target.classList.remove("open");
      this.endDrag(); // Arrête le glissement
      gsap.to(this.target, { 
        y: this.maxY, // Glisse jusqu'en bas
        duration: 0.3
      });
      isOpen = false;
    }
  }
});

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
