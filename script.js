(() => {
  // Configuration
  const PAGES = ['Chasse.html', 'Coterie.html', 'Influence.html', 'Memoria.html', 'Enquete.html'];
  const SWIPE_THRESHOLD = 50;
  const TOOLTIP_VIDEO_LOOP_START = 10;

  // États de l'application
  let currentPageIndex = 0;
  let touchStartX = 0;
  let isAnimating = false;
  let tooltipLoaded = false;

  // Éléments DOM
  const body = document.body;
  const tooltipTrigger = document.getElementById('tooltip-trigger');
  const tooltipContainer = document.querySelector('.tooltip-content');
  const contentContainer = document.querySelector('.content-container');
  const pageTitle = document.querySelector('h1');

  // Initialisation
  function init() {
      const currentPage = window.location.pathname.split('/').pop();
      currentPageIndex = PAGES.indexOf(currentPage);
      sessionStorage.setItem('currentPage', currentPageIndex);

      setupEventListeners();
      prefetchPages();
      setupAccessibility();
  }

  // Gestion des événements
  function setupEventListeners() {
      body.addEventListener('touchstart', handleTouchStart);
      body.addEventListener('touchend', handleTouchEnd);
      
      if (tooltipTrigger) {
          tooltipTrigger.addEventListener('click', handleTooltipToggle);
          document.addEventListener('click', handleOutsideTooltipClick);
      }
  }

  // Logique de navigation
  function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
      if (isAnimating) return;

      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
          navigate(deltaX > 0 ? 'right' : 'left');
      }
  }

  function navigate(direction) {
      isAnimating = true;
      const animationClass = `swipe-${direction}`;

      contentContainer.classList.add(animationClass);
      pageTitle.classList.add(animationClass);

      const cleanup = () => {
          contentContainer.classList.remove(animationClass);
          pageTitle.classList.remove(animationClass);
          isAnimating = false;
      };

      contentContainer.addEventListener('animationend', () => {
          cleanup();
          updatePage(direction === 'left' ? 'next' : 'prev');
      }, { once: true });
  }

  function updatePage(direction) {
      const newIndex = direction === 'next' ? 
          Math.min(currentPageIndex + 1, PAGES.length - 1) : 
          Math.max(currentPageIndex - 1, 0);

      if (newIndex === currentPageIndex) return;

      try {
          sessionStorage.setItem('currentPage', newIndex);
          sessionStorage.setItem('transitionDirection', direction);
          document.documentElement.classList.add('page-transition');
          window.location.href = PAGES[newIndex];
      } catch (error) {
          console.error('Navigation error:', error);
          document.body.classList.add('error-transition');
      }
  }

  // Gestion des tooltips
  function handleTooltipToggle(e) {
      e.stopPropagation();
      
      if (tooltipContainer.style.display === 'block') {
          hideTooltip();
      } else {
          showTooltip();
      }
  }

  function showTooltip() {
      tooltipContainer.style.display = 'block';
      tooltipTrigger.setAttribute('aria-expanded', 'true');
      
      if (!tooltipLoaded) {
          loadTooltipContent();
      } else {
          restartTooltipVideo();
      }
  }

  function hideTooltip() {
      tooltipContainer.style.display = 'none';
      tooltipTrigger.setAttribute('aria-expanded', 'false');
      pauseTooltipVideo();
  }

  async function loadTooltipContent() {
      try {
          const response = await fetch('Contenu-tooltips.html');
          if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
          
          tooltipContainer.innerHTML = await response.text();
          tooltipLoaded = true;
          setupTooltipVideo();
      } catch (error) {
          console.error('Tooltip loading failed:', error);
          tooltipContainer.innerHTML = '<p>Content unavailable</p>';
      }
  }

  // Contrôle vidéo
  function setupTooltipVideo() {
      const tooltipVideo = document.getElementById('tooltip-video');
      if (!tooltipVideo) return;

      tooltipVideo.currentTime = 0;
      tooltipVideo.play();

      tooltipVideo.addEventListener('timeupdate', handleVideoTimeUpdate);
      tooltipVideo.addEventListener('error', handleVideoError);
  }

  function handleVideoTimeUpdate() {
      const video = this;
      if (video.currentTime >= video.duration - 1) {
          video.currentTime = TOOLTIP_VIDEO_LOOP_START;
          video.play();
      }
  }

  function handleVideoError() {
      console.error('Video playback failed');
      this.parentElement.innerHTML = '<p>Video unavailable</p>';
  }

  function restartTooltipVideo() {
      const tooltipVideo = document.getElementById('tooltip-video');
      if (tooltipVideo) {
          tooltipVideo.currentTime = 0;
          tooltipVideo.play();
      }
  }

  function pauseTooltipVideo() {
      const tooltipVideo = document.getElementById('tooltip-video');
      if (tooltipVideo) tooltipVideo.pause();
  }

  // Accessibilité
  function setupAccessibility() {
      if (tooltipTrigger) {
          tooltipTrigger.setAttribute('aria-haspopup', 'dialog');
          tooltipTrigger.setAttribute('aria-expanded', 'false');
          tooltipTrigger.addEventListener('keydown', handleTooltipKeyboard);
      }
  }

  function handleTooltipKeyboard(e) {
      if (['Enter', ' '].includes(e.key)) {
          e.preventDefault();
          tooltipTrigger.click();
      }
  }

  function handleOutsideTooltipClick(e) {
      if (!tooltipTrigger.contains(e.target) && !tooltipContainer.contains(e.target)) {
          hideTooltip();
      }
  }

  // Optimisations
  function prefetchPages() {
      PAGES.forEach(page => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
      });
  }

  // Gestion des transitions
  window.onload = () => {
      const direction = sessionStorage.getItem('transitionDirection');
      if (!direction || !contentContainer) return;

      contentContainer.classList.add(`enter-${direction}`);
      
      const cleanup = () => {
          document.documentElement.classList.remove('page-transition');
          contentContainer.classList.remove(`enter-${direction}`);
          sessionStorage.removeItem('transitionDirection');
      };

      contentContainer.addEventListener('animationend', cleanup, { once: true });
  };

  // Démarrage
  document.addEventListener('DOMContentLoaded', init);
})();