// Modal Module
export function initModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.querySelector(".modal-close");

  if (!modal) return;

  // Close modal when clicking close button
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
}

export function openModal(projectData) {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  // Populate modal with project data
  document.getElementById("modal-title").textContent = projectData.title;
  document.getElementById("modal-category").textContent = projectData.category;
  document.getElementById("modal-description").textContent =
    projectData.description;
  document.getElementById("modal-details").textContent =
    projectData.details ||
    "Additional project details available upon consultation.";

  // Set image if available
  const modalImage = document.getElementById("modal-image");
  if (projectData.imageUrl) {
    modalImage.src = projectData.imageUrl;
    modalImage.alt = projectData.title;
  } else {
    modalImage.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTE4NSAxMzVIMjE1VjE2NUgxODVWMTM1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K";
    modalImage.alt = "Project image placeholder";
  }

  // Show modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

export function addPortfolioClickHandlers(PROJECTS_DATA) {
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.querySelector("h3")?.textContent || "Project";
      const description =
        item.querySelector("p")?.textContent || "Project description";

      // Find matching project data
      const projectData = PROJECTS_DATA.find((p) => p.title === title) || {
        title: title,
        category: "Interior Design",
        description: description,
        details: "Contact us for more details about this project.",
        imageUrl: null,
      };

      openModal(projectData);
    });
  });
}
