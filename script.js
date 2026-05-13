/* ============================================================
   EKTA SACHAN — PORTFOLIO
   script.js
   Cleaned + Optimized Version
   ============================================================ */


/* ──────────────────────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;

  cursor.style.left = `${mx}px`;
  cursor.style.top = `${my}px`;
});

(function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;

  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;

  requestAnimationFrame(animateRing);
})();

/* Hover states */
document.querySelectorAll(
  'a, .work-card, .short-card, .personal-card, .popup-btn, .footer-social-btn, .lightbox-close'
).forEach((el) => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
  });

  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering');
  });
});


/* ──────────────────────────────────────────────────────────
   3D DICE INTRO
────────────────────────────────────────────────────────── */
const diceIntroStage = document.getElementById('dice-intro-stage');
const diceWrapper = document.getElementById('dice-wrapper');
const diceCube = document.getElementById('dice-cube');
const diceShadow = document.getElementById('dice-shadow');

const heroEls = document.querySelectorAll(
  '.hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta, .hero-scroll-hint'
);

let diceTriggered = false;
let diceSettled = false;

const FINAL_DICE_ROTATION =
  'rotateX(-26deg) rotateY(38deg) rotateZ(0deg)';


/* Dice pip layouts */
const dicePipPatterns = {
  1: ['p-center'],
  2: ['p-tl', 'p-br'],
  3: ['p-tl', 'p-center', 'p-br'],
  4: ['p-tl', 'p-tr', 'p-bl', 'p-br'],
  5: ['p-tl', 'p-tr', 'p-center', 'p-bl', 'p-br'],
  6: ['p-tl', 'p-tr', 'p-ml', 'p-mr', 'p-bl', 'p-br']
};


/* Create pip */
function makeDicePip(className) {
  const pip = document.createElement('span');
  pip.className = `dice-pip ${className}`;
  return pip;
}


/* Fill face */
function fillDiceFace(faceSelector, value) {
  const face = document.querySelector(faceSelector);

  if (!face) return;

  face.innerHTML = '';

  dicePipPatterns[value].forEach((positionClass) => {
    face.appendChild(makeDicePip(positionClass));
  });
}


/* Final visible orientation */
function setFinalDiceFaces() {
  fillDiceFace('.dice-front', 4);
  fillDiceFace('.dice-right', 1);
  fillDiceFace('.dice-top', 2);

  fillDiceFace('.dice-left', 3);
  fillDiceFace('.dice-back', 6);
  fillDiceFace('.dice-bottom', 5);
}


/* Reset */
function resetDiceIntro() {
  diceTriggered = false;
  diceSettled = false;

  setFinalDiceFaces();

  diceIntroStage.style.opacity = '1';

  diceWrapper.style.transition = 'none';
  diceCube.style.transition = 'none';
  diceShadow.style.transition = 'none';

  diceWrapper.style.top = '-180px';
  diceWrapper.style.opacity = '0';

  diceCube.style.transform = FINAL_DICE_ROTATION;

  diceShadow.style.opacity = '0';
  diceShadow.style.transform =
    'translateX(-50%) scale(0.2)';
}


/* Main animation */
function triggerDice() {
  if (diceTriggered) return;

  diceTriggered = true;

  const finalTop = window.innerHeight - 250;

  /* Show dice */
  diceWrapper.style.opacity = '1';

  requestAnimationFrame(() => {

    /* FALL */
    diceWrapper.style.transition =
      'top 1s cubic-bezier(0.22, 1, 0.36, 1)';

    diceCube.style.transition =
      'transform 1s cubic-bezier(0.22, 1, 0.36, 1)';

    diceShadow.style.transition =
      'opacity 1s ease, transform 1s ease';

    diceWrapper.style.top = `${finalTop}px`;

    diceCube.style.transform =
      'rotateX(320deg) rotateY(260deg) rotateZ(100deg)';

    diceShadow.style.opacity = '0.78';

    diceShadow.style.transform =
      'translateX(-50%) scale(0.76)';
  });


  /* IMPACT */
  setTimeout(() => {

    diceWrapper.style.transition =
      'top 0.16s ease-out';

    diceCube.style.transition =
      'transform 0.16s ease-out';

    diceShadow.style.transition =
      'transform 0.16s ease-out, opacity 0.16s ease-out';

    diceWrapper.style.top = `${finalTop + 16}px`;

    diceCube.style.transform =
      'rotateX(14deg) rotateY(200deg) rotateZ(-18deg)';

    diceShadow.style.opacity = '1';

    diceShadow.style.transform =
      'translateX(-50%) scale(1.05)';

  }, 1020);


  /* REBOUND */
  setTimeout(() => {

    diceWrapper.style.transition =
      'top 0.15s ease-out';

    diceCube.style.transition =
      'transform 0.15s ease-out';

    diceShadow.style.transition =
      'transform 0.15s ease-out';

    diceWrapper.style.top = `${finalTop + 6}px`;

    diceCube.style.transform =
      'rotateX(-10deg) rotateY(72deg) rotateZ(-12deg)';

    diceShadow.style.transform =
      'translateX(-50%) scale(0.92)';

  }, 1200);


  /* FINAL SETTLE */
  setTimeout(() => {

    diceWrapper.style.transition =
      'top 0.42s cubic-bezier(0.16, 1, 0.3, 1)';

    diceCube.style.transition =
      'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)';

    diceShadow.style.transition =
      'transform 0.42s ease, opacity 0.42s ease';

    diceWrapper.style.top = `${finalTop + 10}px`;

    diceCube.style.transform =
      FINAL_DICE_ROTATION;

    diceShadow.style.opacity = '0.92';

    diceShadow.style.transform =
      'translateX(-50%) scale(0.88)';

    diceSettled = true;

  }, 1380);


  /* HERO REVEAL */
  setTimeout(() => {

    heroEls.forEach((el, i) => {

      setTimeout(() => {
        el.classList.add('revealed');
      }, i * 160);

    });

  }, 1900);
}


/* Init */
resetDiceIntro();


/* Play intro once */
window.addEventListener('load', () => {

  setTimeout(() => {
    triggerDice();
  }, 350);

});


/* ──────────────────────────────────────────────────────────
   DICE FADE ON SCROLL
────────────────────────────────────────────────────────── */
window.addEventListener(
  'scroll',
  handleDiceFadeOnScroll,
  { passive: true }
);

function handleDiceFadeOnScroll() {

  if (!diceSettled) return;

  const fadeStart = window.innerHeight * 0.08;
  const fadeEnd = window.innerHeight * 0.38;

  const currentScroll = window.scrollY;

  if (currentScroll <= fadeStart) {
    diceIntroStage.style.opacity = '1';
    return;
  }

  if (currentScroll >= fadeEnd) {
    diceIntroStage.style.opacity = '0';
    return;
  }

  const progress =
    (currentScroll - fadeStart) /
    (fadeEnd - fadeStart);

  const opacity = 1 - progress;

  diceIntroStage.style.opacity = opacity.toString();
}


/* ──────────────────────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry, i) => {

      if (entry.isIntersecting) {

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);

        revealObserver.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.1
  }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ──────────────────────────────────────────────────────────
   VIDEO LIGHTBOX
────────────────────────────────────────────────────────── */
function openLightbox(url, label) {

  document.getElementById('lightbox-iframe').src = url;

  document.getElementById('lightbox-label').textContent =
    label || '';

  document.getElementById('video-lightbox')
    .classList.add('open');

  document.body.style.overflow = 'hidden';
}

function closeLightbox() {

  document.getElementById('lightbox-iframe').src = '';

  document.getElementById('video-lightbox')
    .classList.remove('open');

  document.body.style.overflow = '';
}


/* Close on backdrop click */
document.getElementById('video-lightbox')
  .addEventListener('click', function (e) {

    if (e.target === this) {
      closeLightbox();
    }

  });


/* Close on ESC */
document.addEventListener('keydown', (e) => {

  if (e.key === 'Escape') {
    closeLightbox();
  }

});


/* ──────────────────────────────────────────────────────────
   HERO PARALLAX
────────────────────────────────────────────────────────── */
document.addEventListener('mousemove', (e) => {

  const heroBg = document.querySelector('.hero-bg');

  if (!heroBg) return;

  const x =
    (e.clientX / window.innerWidth - 0.5) * 14;

  const y =
    (e.clientY / window.innerHeight - 0.5) * 14;

  heroBg.style.transform =
    `translate(${x}px, ${y}px)`;

});
