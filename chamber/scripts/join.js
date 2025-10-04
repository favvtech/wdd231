// Join Page JavaScript Functionality

(function () {
  "use strict";

  // Set timestamp when page loads
  function setTimestamp() {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
      const now = new Date();
      const timestamp = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      timestampField.value = timestamp;
    }
  }

  // Modal functionality
  function initializeModals() {
    const modalLinks = document.querySelectorAll(".learn-more-link");
    const modals = document.querySelectorAll(".membership-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    // Open modals
    modalLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const modalId = this.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.showModal();
        }
      });
    });

    // Close modals with close buttons
    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modal = this.closest(".membership-modal");
        if (modal) {
          modal.close();
        }
      });
    });

    // Close modals when clicking outside
    modals.forEach((modal) => {
      modal.addEventListener("click", function (event) {
        if (event.target === this) {
          this.close();
        }
      });
    });

    // Close modals with Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modals.forEach((modal) => {
          if (modal.open) {
            modal.close();
          }
        });
      }
    });
  }

  // Form validation enhancement
  function enhanceFormValidation() {
    const form = document.querySelector(".membership-form");
    const inputs = form.querySelectorAll("input[required], select[required]");

    inputs.forEach((input) => {
      // Real-time validation
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this);
        }
      });
    });

    // Form submission validation
    form.addEventListener("submit", function (e) {
      let isValid = true;

      inputs.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus first invalid field
        const firstInvalid = form.querySelector(".error");
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Remove existing error styling
    field.classList.remove("error");
    removeErrorMessage(field);

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      errorMessage = "This field is required";
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
    }

    // Phone validation
    if (field.type === "tel" && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid phone number";
      }
    }

    // Pattern validation for organizational title
    if (field.id === "orgTitle" && value) {
      const pattern = field.getAttribute("pattern");
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        isValid = false;
        errorMessage =
          "Title must contain only letters, hyphens, and spaces (minimum 7 characters)";
      }
    }

    // Show error if invalid
    if (!isValid) {
      field.classList.add("error");
      showErrorMessage(field, errorMessage);
    }

    return isValid;
  }

  function showErrorMessage(field, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "var(--color-error)";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.25rem";

    field.parentNode.appendChild(errorDiv);
  }

  function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }

  // Membership card animations
  function initializeCardAnimations() {
    const cards = document.querySelectorAll(".membership-card");

    // Intersection Observer for animation triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cards.forEach((card) => {
      card.style.animationPlayState = "paused";
      observer.observe(card);
    });
  }

  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    setTimestamp();
    initializeModals();
    enhanceFormValidation();
    initializeCardAnimations();
  });
})();
