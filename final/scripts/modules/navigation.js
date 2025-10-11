// Navigation Module
export function initNavigation() {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // Animate hamburger bars
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0)
            bar.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (index === 1) bar.style.opacity = "0";
          if (index === 2)
            bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        }
      });
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      }
    });
  });

  // Active Navigation Link Highlighting
  function updateActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (
        (currentPage === "index.html" || currentPage === "") &&
        (href === "index.html" || href === "#home")
      ) {
        link.classList.add("active");
      } else if (href === currentPage) {
        link.classList.add("active");
      }
    });
  }

  // Initialize active nav link on page load
  window.addEventListener("load", updateActiveNavLink);
}
