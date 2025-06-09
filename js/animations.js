// Animation Functions for IRMANUFA Website

// ========== Scroll Reveal Animations ==========
function initScrollReveal() {
  // Initialize scroll reveal animations
  const sr = ScrollReveal({
    origin: "top",
    distance: "30px",
    duration: 1000,
    reset: false,
  });

  // Hero section
  sr.reveal(".hero-title", { delay: 200 });
  sr.reveal(".hero-subtitle", { delay: 400 });
  sr.reveal(".hero-buttons", { delay: 600 });

  // Welcome card
  sr.reveal(".welcome-card", { delay: 200 });

  // About section
  sr.reveal(".about-img", { origin: "left", delay: 200 });
  sr.reveal(".about-text", { origin: "right", delay: 400 });

  // Programs section
  sr.reveal(".program-card", { interval: 200 });

  // Gallery section
  sr.reveal(".gallery-item", { interval: 100 });

  // Team section
  sr.reveal(".team-member", { interval: 200 });

  // Blog section
  sr.reveal(".blog-card", { interval: 200 });

  // Donation section
  sr.reveal(".donation-text", { origin: "left", delay: 200 });
  sr.reveal(".donation-form", { origin: "right", delay: 400 });

  // Contact section
  sr.reveal(".contact-info", { origin: "left", delay: 200 });
  sr.reveal(".contact-form", { origin: "right", delay: 400 });

  // Prayer times
  sr.reveal(".prayer-time", { interval: 200 });
}

// ========== Parallax Effects ==========
function initParallax() {
  // Simple parallax effect for hero section
  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    });
  }
}

// ========== Animated Counters ==========
function initAnimatedCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(initAnimatedCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// ========== Typing Animation ==========
function initTypingAnimation() {
  const typedElements = document.querySelectorAll(".typed");

  typedElements.forEach((element) => {
    const strings = JSON.parse(element.getAttribute("data-typed-items"));
    const options = {
      strings: strings,
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    };

    new Typed(element, options);
  });
}

// ========== Progress Bar Animation ==========
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width + "%";
    }, 200);
  });
}

// ========== Testimonial Carousel ==========
function initTestimonialCarousel() {
  const testimonialCarousel = document.querySelector(".testimonial-carousel");

  if (testimonialCarousel) {
    new Glide(testimonialCarousel, {
      type: "carousel",
      perView: 1,
      autoplay: 3000,
      animationDuration: 800,
      breakpoints: {
        768: {
          perView: 1,
        },
      },
    }).mount();
  }
}

// ========== Gallery Filter ==========
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".gallery-filter button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          item.classList.add("animate", "fadeIn");
        } else {
          item.style.display = "none";
          item.classList.remove("animate", "fadeIn");
        }
      });
    });
  });
}

// ========== Accordion ==========
function initAccordion() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", function () {
      // Toggle active class
      item.classList.toggle("active");

      // Toggle icon
      const icon = this.querySelector("i");
      if (item.classList.contains("active")) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      } else {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      }

      // Toggle content
      const content = item.querySelector(".accordion-content");
      if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

// ========== Tabs ==========
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// ========== Modal ==========
function initModal() {
  const modalButtons = document.querySelectorAll('[data-toggle="modal"]');
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  // Open modal
  modalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-target");
      const modal = document.querySelector(modalId);

      modal.classList.add("show");
      document.body.classList.add("no-scroll");
    });
  });

  // Close modal
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");

      modal.classList.remove("show");
      document.body.classList.remove("no-scroll");
    });
  });

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }
    });
  });
}

// ========== Tooltips ==========
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    const tooltipText = element.getAttribute("data-tooltip");
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = tooltipText;

    element.appendChild(tooltip);

    element.addEventListener("mouseenter", function () {
      tooltip.classList.add("show");
    });

    element.addEventListener("mouseleave", function () {
      tooltip.classList.remove("show");
    });
  });
}

// ========== Countdown Timer ==========
function initCountdown() {
  const countdownElements = document.querySelectorAll(".countdown");

  countdownElements.forEach((element) => {
    const endDate = new Date(element.getAttribute("data-date")).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        element.innerHTML = "Event has started!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      element.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
    }, 1000);
  });
}

// ========== Initialize All Animations ==========
function initAllAnimations() {
  initScrollReveal();
  initParallax();
  initAnimatedCounters();
  initTypingAnimation();
  initProgressBars();
  initTestimonialCarousel();
  initGalleryFilter();
  initAccordion();
  initTabs();
  initModal();
  initTooltips();
  initCountdown();
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initAllAnimations();
});
