// Forms Module
export function initForms() {
  // Contact Form Handling
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const message = formData.get("message");

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Store form data in localStorage for form action page
      const formDataObj = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("contactFormData", JSON.stringify(formDataObj));

      // Simulate form submission (in real implementation, this would send to a server)
      const submitButton = this.querySelector(".send-message-btn");
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      setTimeout(() => {
        // Redirect to form action page
        window.location.href = "form-action.html";
      }, 1500);
    });
  }

  // Package Selection
  const packageButtons = document.querySelectorAll(".package-button");
  packageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const packageCard = this.closest(".package-card");
      const packageName = packageCard.querySelector("h3").textContent;
      const packagePrice = packageCard.querySelector(".price").textContent;

      // In a real implementation, this would redirect to a booking/contact form
      alert(
        `You selected the ${packageName} package (${packagePrice}). Redirecting to contact form...`
      );

      // Simulate redirect to contact page
      setTimeout(() => {
        window.location.href = "contact.html";
      }, 1000);
    });
  });
}
