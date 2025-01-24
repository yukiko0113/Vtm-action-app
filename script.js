document.addEventListener('DOMContentLoaded', function() {
    const tooltipTrigger = document.getElementById('tooltip-trigger');
    const tooltipContainer = document.getElementById('tooltip-container');
  
    // Fonction pour charger le contenu des tooltips
    function loadTooltipContent() {
      fetch('Contenu-tooltips.html')
        .then(response => response.text())
        .then(data => {
          tooltipContainer.innerHTML = data;
          const video = document.getElementById('tooltip-video');
          if (video) {
            video.loop = true;
            video.addEventListener('timeupdate', function() {
              if (video.currentTime >= video.duration - 20) {
                video.currentTime = video.duration - 20;
              }
            });
            video.play();
          }
        })
        .catch(error => console.error('Erreur lors du chargement du contenu des tooltips:', error));
    }
  
    // Toggle tooltip visibility on click
    tooltipTrigger.addEventListener('click', function(event) {
      if (tooltipContainer.style.display === 'block') {
        tooltipContainer.style.display = 'none';
      } else {
        loadTooltipContent(); // Charger le contenu de la tooltip
        tooltipContainer.style.display = 'block';
        const rect = tooltipTrigger.getBoundingClientRect();
        tooltipContainer.style.top = `${rect.top + window.scrollY - tooltipContainer.offsetHeight - 10}px`; // Positionner au-dessus du bouton
        tooltipContainer.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltipContainer.offsetWidth / 2}px`; // Centrer horizontalement
      }
    });
  
    // Fermer la tooltip si on clique en dehors
    document.addEventListener('click', function(event) {
      if (!tooltipTrigger.contains(event.target) && !tooltipContainer.contains(event.target)) {
        tooltipContainer.style.display = 'none';
      }
    });
  });