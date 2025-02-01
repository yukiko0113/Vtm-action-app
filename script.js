document.addEventListener('DOMContentLoaded', () => {
  // Initialisation de GSAP et des plugins
  gsap.registerPlugin(ScrollTrigger, Draggable);

// Configuration MODAL
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector("#modal");
  const btnOuvrir = document.querySelector(".open-button");
  const btnFermer = document.querySelector(".close-button");

  console.log('Modal:', modal);
  console.log(' Bouton ouvrir:', btnOuvrir);
  console.log(' Bouton fermer:', btnFermer);

  function ouvrirModal() {
      console.log('Fonction ouvrirModal appelée');
      if (!modal) {
          console.error('La modal n\'a pas été trouvée');
          return;
      }
      
      console.log('Avant l\'animation - Display:', modal.style.display);
      modal.style.display = "block";
      modal.style.opacity = "0";
      modal.style.transform = "translateY(100%)";
      
      setTimeout(() => {
          console.log('Après animation - Transform:', modal.style.transform);
          modal.style.transform = "translateY(0)";
          modal.style.opacity = "1";
      }, 100);
  }

  function fermerModal() {
      console.log('Fonction fermerModal appelée');
      if (!modal) {
          console.error('La modal n\'a pas été trouvée');
          return;
      }
      
      console.log('Avant fermeture - Display:', modal.style.display);
      modal.style.transform = "translateY(100%)";
      modal.style.opacity = "0";
      
      setTimeout(() => {
          console.log('Après fermeture - Display:', modal.style.display);
          modal.style.display = "none";
      }, 300);
  }

  if (btnOuvrir) {
      btnOuvrir.addEventListener("click", ouvrirModal);
      console.log('Écouteur de clic ajouté au bouton ouvrir');
  } else {
      console.error('Bouton ouvrir non trouvé');
  }

  if (btnFermer) {
      btnFermer.addEventListener("click", fermerModal);
      console.log('Écouteur de clic ajouté au bouton fermer');
  } else {
      console.error('Bouton fermer non trouvé');
  }

  // Fermeture au clic hors modal
  if (modal) {
      modal.addEventListener("click", (e) => {
          if (e.target === modal) {
              console.log('Clic sur la modal - Fermeture');
              fermerModal();
          }
      });
  }

  // Fermeture avec la touche Échap
  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
          console.log('Touche Échap pressée - Fermeture');
          fermerModal();
      }
  });
});

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
