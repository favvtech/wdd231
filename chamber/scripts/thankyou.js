// Thank You Page JavaScript Functionality

(function () {
  "use strict";

  // Get URL parameters
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Display form data
  function displayFormData() {
    const fields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "businessName",
      "timestamp",
    ];

    fields.forEach((field) => {
      const value = getUrlParameter(field);
      const displayElement = document.getElementById("display-" + field);

      if (displayElement && value) {
        // Decode URL-encoded values
        displayElement.textContent = decodeURIComponent(value);
      } else if (displayElement) {
        displayElement.textContent = "Not provided";
        displayElement.style.fontStyle = "italic";
        displayElement.style.color = "var(--color-text-muted)";
      }
    });
  }

  // Format timestamp for better display
  function formatTimestamp(timestamp) {
    if (!timestamp) return "Not available";

    try {
      // Try to parse the timestamp and format it nicely
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        // If it's not a valid date, return as-is
        return timestamp;
      }

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch (error) {
      return timestamp;
    }
  }

  // Enhanced form data display with formatting
  function displayFormDataEnhanced() {
    const fields = ["firstName", "lastName", "email", "mobile", "businessName"];

    fields.forEach((field) => {
      const value = getUrlParameter(field);
      const displayElement = document.getElementById("display-" + field);

      if (displayElement && value) {
        displayElement.textContent = decodeURIComponent(value);
      } else if (displayElement) {
        displayElement.textContent = "Not provided";
        displayElement.style.fontStyle = "italic";
        displayElement.style.color = "var(--color-text-muted)";
      }
    });

    // Special handling for timestamp
    const timestampValue = getUrlParameter("timestamp");
    const timestampElement = document.getElementById("display-timestamp");

    if (timestampElement) {
      if (timestampValue) {
        timestampElement.textContent = formatTimestamp(
          decodeURIComponent(timestampValue)
        );
      } else {
        timestampElement.textContent = "Not available";
        timestampElement.style.fontStyle = "italic";
        timestampElement.style.color = "var(--color-text-muted)";
      }
    }
  }

  // Add loading animation
  function showLoadingState() {
    const loadingElements = document.querySelectorAll('[id^="display-"]');
    loadingElements.forEach((element) => {
      element.textContent = "Loading...";
      element.style.fontStyle = "italic";
      element.style.color = "var(--color-text-muted)";
    });
  }

  // Simulate loading delay for better UX
  function simulateLoading() {
    showLoadingState();

    setTimeout(() => {
      displayFormDataEnhanced();
    }, 1000);
  }

  // Check if we have form data
  function hasFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has("firstName") || urlParams.has("email");
  }

  // Handle case where no form data is present
  function handleNoFormData() {
    const summarySection = document.querySelector(".application-summary");
    if (summarySection) {
      summarySection.innerHTML = `
        <h3>No Application Data Found</h3>
        <p>It appears you accessed this page directly without submitting a membership application.</p>
        <p>Please <a href="join.html">return to the membership application form</a> to apply for membership.</p>
      `;
    }
  }

  // Initialize page
  function initializePage() {
    if (hasFormData()) {
      simulateLoading();
    } else {
      handleNoFormData();
    }
  }

  // Add smooth scrolling for anchor links
  function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Add success animation
  function addSuccessAnimation() {
    const successMessage = document.querySelector(".success-message");
    if (successMessage) {
      successMessage.style.opacity = "0";
      successMessage.style.transform = "translateY(20px)";

      setTimeout(() => {
        successMessage.style.transition = "all 0.6s ease";
        successMessage.style.opacity = "1";
        successMessage.style.transform = "translateY(0)";
      }, 200);
    }
  }

  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    initializePage();
    initializeSmoothScrolling();
    addSuccessAnimation();
  });
})();
