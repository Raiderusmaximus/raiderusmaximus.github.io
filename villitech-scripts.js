// Gear button: brief faster spin burst on click
var gearBtn = document.getElementById('gearBtn');
if (gearBtn) {
  gearBtn.addEventListener('click', function(){
    gearBtn.classList.remove('burst');
    void gearBtn.offsetWidth;
    gearBtn.classList.add('burst');
  });
  gearBtn.querySelector('svg').addEventListener('animationend', function(){
    gearBtn.classList.remove('burst');
  });
}

// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal — progressive enhancement only; .reveal is visible by default
// in CSS so content is never stuck invisible if the observer fails
if ('IntersectionObserver' in window){
  document.documentElement.classList.add('js-reveal');
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
}

// Lightbox — only initialises if a #lightbox element exists on the page
var lightbox = document.getElementById('lightbox');
if (lightbox) {
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.art-card img').forEach(function(img){
    img.addEventListener('click', function(){
      openLightbox(img.src, img.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeLightbox();
  });
}
