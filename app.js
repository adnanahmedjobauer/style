document.addEventListener('DOMContentLoaded', () => {
  // GSAP Animation for Home Section
  gsap.from("#home h1", {
    duration: 1.5,
    opacity: 0,
    y: -100,
    ease: "power3.out"
  });

  gsap.from("#home p", {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power3.out",
    delay: 0.5
  });

  // Smooth Scroll Initialization
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true
  });

  // GSAP ScrollTrigger to animate the About section elements
  gsap.registerPlugin(ScrollTrigger);

  // Animate image on scroll with GSAP ScrollTrigger
  gsap.from('.img-container img', {
    duration: 0.1,
    opacity: 0,
    y: -100,
    ease: "power3.out",
    scrollTrigger: {
      trigger: '.img-container img',
      start: 'top 90%',
      scrub: false
    }
  });

  // Animate text with GSAP ScrollTrigger
  gsap.from('.lead', {
    opacity: 0,
    x: 50,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.lead',
      start: 'top 80%',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Animate progress bars with GSAP ScrollTrigger
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const skillValue = bar.getAttribute('aria-valuenow');
    
    gsap.fromTo(bar, {
      width: '0%'
    }, {
      width: `${skillValue}%`,
      duration: 2,
      ease: 'power3.out'
    });
  });



  // GSAP Animation for Contact Section
  gsap.from("#contact h2", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from("form", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.from(".form-label", {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
  });

  gsap.from(".form-control", {
    opacity: 0,
    x: -50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    delay: 0.7
  });

  gsap.from("button.btn-primary", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 1,
    ease: "power3.out"
  });
});