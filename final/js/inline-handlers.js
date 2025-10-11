// Inline JavaScript handlers extracted from HTML files

// Navigation handlers
function navigateToProjects() {
  window.location.href = 'projects.html';
}

function navigateToContact() {
  window.location.href = 'contact.html';
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers to buttons with specific classes
  const projectButtons = document.querySelectorAll('.hero-cta, .cta-button');
  projectButtons.forEach(button => {
    if (button.textContent.includes('View Projects') || button.textContent.includes('Explore')) {
      button.addEventListener('click', navigateToProjects);
    } else if (button.textContent.includes('Contact') || button.textContent.includes('Get Started')) {
      button.addEventListener('click', navigateToContact);
    }
  });
});
