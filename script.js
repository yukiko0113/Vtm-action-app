document.addEventListener('DOMContentLoaded', () => {
  // Initialisation de GSAP et des plugins
  gsap.registerPlugin(ScrollTrigger, Draggable);


// Positionnement initial de la modal en bas de l'écran
// Configuration de la modal
// Sélection des éléments
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const backdrop = document.querySelector('.modal-backdrop');

// Configuration GSAP
gsap.set(modal, { 
  y: window.innerHeight - modal.offsetHeight,
  cursor: 'grab',
  pointerEvents: 'none'
});

// Gestion des événements
document.addEventListener('DOMContentLoaded', () => {
  // Configuration Draggable
  Draggable.create(".modal", {
    type: "y", // Seulement le déplacement vertical
    edgeResistance: 1, // Résistance au bord
    dragResistance: 0.89, // Résistance au glissement
    bounds: { 
      minY: 50, // Position minimale en bas
      maxY: window.innerHeight - 100 // Position maximale en haut
    },
    inertia: true, // Active l'inertie
    liveSnap: true, // Active le snap en temps réel
    onDragStart: () => {
      modal.style.cursor = 'grabbing';
    },
    onDragEnd: () => {
      modal.style.cursor = 'grab';
    }
  });

  // Gestion des clics
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === backdrop) {
      closeModal();
    }
  });

  // Gestion de la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// Ouvrir la modal
function openModal() {
  modal.classList.add('open');
  backdrop.classList.add('active');
}

// Fermer la modal
function closeModal() {
  modal.classList.remove('open');
  backdrop.classList.remove('active');
}
  // Configuration pour les tooltips
  const tooltipTrigger = document.getElementById('tooltip-trigger');
  const tooltipContainer = document.querySelector('.tooltip-content');

  if (tooltipTrigger && tooltipContainer) {
    function loadTooltipContent() {
      // Requête pour charger le contenu HTML de la tooltip
      fetch('Contenu-tooltips.html')
        .then(response => response.text())
        .then(data => {
          // Injecter le contenu HTML dans le container de la tooltip
          tooltipContainer.innerHTML = data;
          
          // Récupérer l'élément vidéo dans la tooltip
          const tooltipVideo = document.getElementById('tooltip-video');
          
          if (tooltipVideo) {
            // Réinitialiser la vidéo à 0
            tooltipVideo.currentTime = 0;
            
            // Démarrer la lecture
            tooltipVideo.play();
    
            // État pour gérer le premier passage
            let firstPlay = true;
    
            // Écouter l'événement de lecture pour gérer le loop
            tooltipVideo.addEventListener('timeupdate', function() {
              // Si c'est le premier passage et que la vidéo est presque terminée
              if (firstPlay && tooltipVideo.currentTime >= tooltipVideo.duration - 1) {
                firstPlay = false;
                // Remettre à 10 secondes et activer le loop
                tooltipVideo.currentTime = 10;
                tooltipVideo.loop = true;
                tooltipVideo.play();
              } else if (!firstPlay && tooltipVideo.currentTime >= tooltipVideo.duration - 1) {
                // Si ce n'est pas le premier passage, remettre à 10 secondes
                tooltipVideo.currentTime = 10;
              }
            });
    
            // Écouter l'événement de fin de lecture
            tooltipVideo.addEventListener('ended', function() {
              // Si le loop est activé, remettre à 10 secondes
              if (tooltipVideo.loop) {
                tooltipVideo.currentTime = 10;
                tooltipVideo.play();
              }
            });
    
            // Écouter l'événement de pause pour éviter les bugs
            tooltipVideo.addEventListener('pause', function() {
              // Si la vidéo est arrêtée, remettre à 0
              tooltipVideo.currentTime = 0;
            });
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement du contenu des tooltips:', error);
        });
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
