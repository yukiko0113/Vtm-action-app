const pages = ['Chasse.html', 'Coterie.html', 'Influence.html', 'Memoria.html', 'Enquete.html'];

let currentPageIndex = 0;
let touchStartX = 0; // Define touchStartX
const swipeThreshold = 50; // Define swipeThreshold

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  currentPageIndex = pages.indexOf(currentPage);
  if (currentPageIndex === -1) currentPageIndex = 0;
  localStorage.setItem('currentPage', currentPageIndex);

  document.body.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });

  document.body.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > swipeThreshold) {
      const direction = deltaX > 0 ? 'right' : 'left';
      navigate(direction);
    }
  });

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

function navigate(direction) {
  if (!['left', 'right'].includes(direction)) return;
  
  const container = document.querySelector('.content-container');
  const h1 = document.querySelector('h1');
  
  if (!container || !h1) return;

  container.classList.add(`swipe-${direction}`);
  h1.classList.add(`swipe-${direction}`);

  const cleanup = () => {
    container.classList.remove(`swipe-${direction}`);
    h1.classList.remove(`swipe-${direction}`);
  };

  container.addEventListener('transitionend', () => {
    cleanup();
    updatePage(direction === 'left' ? 'next' : 'prev');
  }, { once: true });
}

function updatePage(direction) {
  if (!['next', 'prev'].includes(direction)) return;
  
  const newIndex = direction === 'next' 
    ? Math.min(currentPageIndex + 1, pages.length - 1) 
    : Math.max(currentPageIndex - 1, 0);

  if (newIndex !== currentPageIndex) {
    try {
      localStorage.setItem('currentPage', String(newIndex));
      localStorage.setItem('transitionDirection', direction);
      document.documentElement.classList.add('page-transition');
      window.location.href = pages[newIndex];
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
}

window.onload = () => {
  const direction = localStorage.getItem('transitionDirection');
  if (!direction) return;

  const container = document.querySelector('.content-container');
  if (!container) return;

  container.classList.add(`enter-${direction}`);
  
  const cleanup = () => {
    document.documentElement.classList.remove('page-transition');
    container.classList.remove(`enter-${direction}`);
    localStorage.removeItem('transitionDirection');
  };

  container.addEventListener('animationend', cleanup, { once: true });
};