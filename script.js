const gsap = require('gsap');
const { ScrollTrigger, ScrollToPlugin } = require('gsap/all');

// Register all plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function() {
  // Reste de votre code
});

  // Calculate total width for horizontal scrolling
  const totalWidth = container.offsetWidth * (sections.length - 1);

  // Horizontal scrolling setup
  gsap.to(sections, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      scrub: true,
      snap: 1 / (sections.length - 1),
      end: `+=${totalWidth}`
    }
  });

  // Scroll to the section "Chasse" on page load
  const currentPage = localStorage.getItem('currentPage');
  if (currentPage) {
    const targetSection = sections[currentPage];
    if (targetSection) {
      gsap.to(window, { 
        scrollTo: { 
          x: targetSection.offsetLeft, 
          autoKill: false 
        }, 
        duration: 1 
      });
    }
  }

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