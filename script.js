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

 // Logique de navigation par swipe
 const pages = ['Chasse.html', 'Coterie.html', 'Influence.html' , 'Memoria.html' , 'Enquete.html' ];
 let currentPageIndex = parseInt(localStorage.getItem('currentPage')) || 0;
 let touchStartX = 0;
 const swipeThreshold = 50;

 function updatePage(direction) {
   const newIndex = direction === 'next' 
     ? Math.min(currentPageIndex + 1, pages.length - 1) 
     : Math.max(currentPageIndex - 1, 0);

   if (newIndex !== currentPageIndex) {
     currentPageIndex = newIndex;
     localStorage.setItem('currentPage', currentPageIndex);
     window.location.href = pages[currentPageIndex];
   }
 }

 // Gestion des événements tactiles
 document.body.addEventListener('touchstart', e => {
   touchStartX = e.touches[0].clientX;
 });

 document.body.addEventListener('touchend', e => {
   const touchEndX = e.changedTouches[0].clientX;
   const deltaX = touchEndX - touchStartX;

   if (Math.abs(deltaX) > swipeThreshold) {
     deltaX > 0 ? updatePage('prev') : updatePage('next');
   }
 });

 // Feedback visuel pendant le swipe
 document.body.addEventListener('touchmove', e => {
   const deltaX = e.touches[0].clientX - touchStartX;
   if (Math.abs(deltaX) > 30) {
     document.body.style.transform = `translateX(${deltaX}px)`;
   }
 });

 document.body.addEventListener('touchend', () => {
   document.body.style.transform = 'translateX(0)';
 });