// Carousel Module
export function initCarousel() {
  // Hero Carousel
  const heroSlides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;

  if (heroSlides.length > 0) {
    function showSlide(index) {
      // Remove active class from all slides and indicators
      heroSlides.forEach((slide) => slide.classList.remove("active"));
      indicators.forEach((indicator) => indicator.classList.remove("active"));

      // Add active class to current slide and indicator
      heroSlides[index].classList.add("active");
      if (indicators[index]) {
        indicators[index].classList.add("active");
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }
}
