document.addEventListener('DOMContentLoaded', () => {
  // Initialisation de GSAP et des plugins
  gsap.registerPlugin(ScrollTrigger, Draggable);

  // Configuration MODAL
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
  
    // Masquer le bouton d'ouverture
    if (btnOuvrir) {
      btnOuvrir.style.display = 'block';
      btnOuvrir.classList.remove('hidden');
    }
  
    // Initialiser l'animation
    modal.style.display = "block";
    modal.style.opacity = "0";

    
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 100);
  }
  
  function fermerModal() {
    console.log('Fonction fermerModal appelée');
    if (!modal) {
      console.error('La modal n\'a pas été trouvée');
      return;
    }
  
    modal.style.opacity = "0";
    
    setTimeout(() => {
      modal.style.display = "none";
      
      // Afficher à nouveau le bouton d'ouverture
      if (btnOuvrir) {
        btnOuvrir.classList.remove('hidden');
      }
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