// Discover Page JavaScript Functionality

(function () {
  "use strict";

  // Load discovery data and render cards
  async function loadDiscoveryData() {
    try {
      const response = await fetch("./data/discover.json");
      if (!response.ok) {
        throw new Error("Failed to load discovery data");
      }
      const data = await response.json();
      renderDiscoveryCards(data.discoverItems);
    } catch (error) {
      console.error("Error loading discovery data:", error);
      showErrorMessage();
    }
  }

  // Render discovery cards
  function renderDiscoveryCards(items) {
    const grid = document.getElementById("discovery-grid");
    if (!grid) return;

    grid.innerHTML = "";

    items.forEach((item, index) => {
      const card = createDiscoveryCard(item, index + 1);
      grid.appendChild(card);
    });
  }

  // Create individual discovery card
  function createDiscoveryCard(item, cardNumber) {
    const card = document.createElement("article");
    card.className = "discovery-card";
    card.setAttribute("data-card", `card${cardNumber}`);

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img 
          src="./images/${item.image}" 
          alt="${item.name}" 
          loading="lazy"
          decoding="async"
        />
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-more-btn" onclick="handleLearnMore('${item.id}')">
        Learn More
      </button>
    `;

    return card;
  }

  // Handle learn more button click
  function handleLearnMore(itemId) {
    // For now, show an alert. In a real application, this could:
    // - Open a detailed modal
    // - Navigate to a detailed page
    // - Show more information
    alert(
      `Learn more about ${itemId} - This would typically open detailed information about this Nigerian experience.`
    );
  }

  // Show error message if data fails to load
  function showErrorMessage() {
    const grid = document.getElementById("discovery-grid");
    if (grid) {
      grid.innerHTML = `
        <div class="error-message">
          <p>Sorry, we're having trouble loading the discovery content. Please try refreshing the page.</p>
        </div>
      `;
    }
  }

  // Visitor tracking with localStorage
  function initializeVisitorTracking() {
    const visitorMessage = document.getElementById("visitor-message");
    const visitorText = document.getElementById("visitor-text");
    const closeButton = document.getElementById("close-visitor-message");

    if (!visitorMessage || !visitorText) return;

    const currentTime = Date.now();
    const lastVisitKey = "travelall_last_visit";
    const lastVisit = localStorage.getItem(lastVisitKey);

    let message = "";

    if (!lastVisit) {
      // First visit
      message = "Welcome! Let us know if you have any questions.";
    } else {
      const timeDifference = currentTime - parseInt(lastVisit);
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysDifference < 1) {
        // Less than a day
        message = "Back so soon! Awesome!";
      } else {
        // More than a day
        const dayText = daysDifference === 1 ? "day" : "days";
        message = `You last visited ${daysDifference} ${dayText} ago.`;
      }
    }

    // Update the message
    visitorText.textContent = message;

    // Store current visit time
    localStorage.setItem(lastVisitKey, currentTime.toString());

    // Handle close button
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        visitorMessage.classList.add("hidden");
      });
    }

    // Auto-hide message after 10 seconds (optional)
    setTimeout(() => {
      if (!visitorMessage.classList.contains("hidden")) {
        visitorMessage.style.opacity = "0.7";
      }
    }, 10000);
  }

  // Initialize page
  function initializePage() {
    loadDiscoveryData();
    initializeVisitorTracking();
  }

  // Make handleLearnMore globally accessible
  window.handleLearnMore = handleLearnMore;

  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", initializePage);
})();
