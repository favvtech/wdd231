// Main Module - ES6 Module Structure
import { initNavigation } from "./modules/navigation.js";
import { initCarousel } from "./modules/carousel.js";
import { initForms } from "./modules/forms.js";
import { initModal, addPortfolioClickHandlers } from "./modules/modal.js";
import { updateFooterInfo, testLastModified } from "./modules/footer.js";

// Projects data and rendering
const PROJECTS_DATA = [
  {
    title: "Minimalist Living Room",
    category: "Living Room",
    query: "minimalist living room interior design",
    description: "Clean lines and warm neutrals with textured fabrics.",
    details: "Lagos • Minimalist • Oak + Linen",
  },
  {
    title: "Modern Kitchen Renovation",
    category: "Kitchen",
    query: "bright modern kitchen marble countertops",
    description:
      "Maximized natural light with marble tops and custom cabinets.",
    details: "Lekki • Modern • Marble + Oak",
  },
  {
    title: "Cozy Bedroom Retreat",
    category: "Bedroom",
    query: "cozy bedroom interior warm lighting",
    description: "Soft textiles and layered lighting for calm evenings.",
    details: "Ikoyi • Contemporary • Cotton + Walnut",
  },
  {
    title: "Home Office Nook",
    category: "Home Office",
    query: "home office minimalist desk plants",
    description: "Focus-friendly workspace with ergonomic layout.",
    details: "Victoria Island • Minimalist • Pine + Matte Black",
  },
  {
    title: "Scandinavian Living Space",
    category: "Living Room",
    query: "scandinavian living room interior",
    description: "Light woods, soft greys, functional layout.",
    details: "Yaba • Scandinavian • Birch + Wool",
  },
  {
    title: "Sleek Chef's Kitchen",
    category: "Kitchen",
    query: "sleek kitchen island pendant lights",
    description: "Central island with pendant lighting and integrated storage.",
    details: "Ikeja • Modern • Quartz + Steel",
  },
  {
    title: "Serene Master Bedroom",
    category: "Bedroom",
    query: "serene master bedroom interior",
    description: "Muted palette with natural textures for rest.",
    details: "Lekki Phase 1 • Calm • Linen + Rattan",
  },
  {
    title: "Compact Home Office",
    category: "Home Office",
    query: "compact home office small space",
    description: "Smart storage and cable management in small footprint.",
    details: "Ajah • Compact • MDF + Felt",
  },
  {
    title: "Artful Living Room",
    category: "Living Room",
    query: "artful living room gallery wall",
    description: "Gallery wall centerpiece with plush seating.",
    details: "Surulere • Eclectic • Velvet + Brass",
  },
  {
    title: "Monochrome Kitchen",
    category: "Kitchen",
    query: "monochrome black white kitchen",
    description: "Black-and-white palette with matte finishes.",
    details: "VI • Monochrome • Granite + Matte Steel",
  },
  {
    title: "Warm Boho Bedroom",
    category: "Bedroom",
    query: "boho bedroom warm textures",
    description: "Rugs, throws, and plants for a soft boho vibe.",
    details: "Magodo • Boho • Jute + Cotton",
  },
  {
    title: "Executive Home Office",
    category: "Home Office",
    query: "executive home office wood panel",
    description: "Rich wood panels and acoustic treatment.",
    details: "Ikoyi • Executive • Walnut + Leather",
  },
  {
    title: "Sunlit Living Room",
    category: "Living Room",
    query: "sunlit living room large windows",
    description: "Open plan with wide glazing and airy drapes.",
    details: "Lekki • Airy • Sheer + Oak",
  },
  {
    title: "Family Kitchen Hub",
    category: "Kitchen",
    query: "family kitchen breakfast bar",
    description: "Breakfast bar and durable finishes for daily life.",
    details: "Yaba • Family • Laminate + Ceramic",
  },
  {
    title: "Hotel-Style Bedroom",
    category: "Bedroom",
    query: "hotel style bedroom interior",
    description: "Plush headboard, symmetrical lighting, and calm tones.",
    details: "VI • Luxe • Velvet + Satin",
  },
  {
    title: "Studio Workspace",
    category: "Home Office",
    query: "creative studio home office",
    description: "Flexible layout for creative sessions and calls.",
    details: "Ikeja • Creative • Cork + Birch",
  },
  {
    title: "Minimal Living Lounge",
    category: "Living Room",
    query: "minimal living room low sofa",
    description: "Low-profile seating and curated decor.",
    details: "Oniru • Minimal • Poplar + Linen",
  },
  {
    title: "Chef Prep Kitchen",
    category: "Kitchen",
    query: "chef prep kitchen butcher block",
    description: "Butcher block prep and utility lighting.",
    details: "Ogudu • Utility • Butcher Block + Steel",
  },
  {
    title: "Textured Bedroom",
    category: "Bedroom",
    query: "textured bedroom interior design",
    description: "Layered linens and ribbed wall panels.",
    details: "VGC • Textures • Ribbed MDF + Cotton",
  },
  {
    title: "Corner Office Nook",
    category: "Home Office",
    query: "corner home office window light",
    description: "Corner desk with views and storage.",
    details: "Yaba • Corner • Oak + Lacquer",
  },
  {
    title: "Contemporary Living",
    category: "Living Room",
    query: "contemporary living room interior",
    description: "Statement rug and balanced proportions.",
    details: "Ikoyi • Contemporary • Wool + Bronze",
  },
  {
    title: "Smart Kitchen",
    category: "Kitchen",
    query: "smart kitchen appliances interior",
    description: "Integrated smart appliances with tidy lines.",
    details: "Lekki 2 • Smart • Quartz + Glass",
  },
  {
    title: "Calming Bedroom",
    category: "Bedroom",
    query: "calming bedroom pastel",
    description: "Pastel hues and soft lighting for rest.",
    details: "Surulere • Calm • Pastel + Sheers",
  },
  {
    title: "Dual Monitor Setup",
    category: "Home Office",
    query: "dual monitor home office setup",
    description: "Productivity-focused dual screen arrangement.",
    details: "Ikate • Productivity • Laminate + Mesh",
  },
  {
    title: "Luxe Living Suite",
    category: "Living Room",
    query: "luxury living room interior",
    description: "High-end finishes with bespoke furniture.",
    details: "Banana Island • Luxury • Marble + Brass",
  },
];

const PROJECTS_STATE = {
  pageSize: 6,
  currentShown: 0,
  filtered: PROJECTS_DATA,
  category: "all",
  query: "",
};

// Dynamic Image Loading for Projects Section using Unsplash API
async function loadPortfolioImages() {
  const portfolioItems = document.querySelectorAll(".portfolio-item img");

  if (portfolioItems.length === 0) return;

  const API_KEY = "Qt3MkSfmtAmiwiS_IlIlBULWj_tUvol242S9N8Es2O0";
  const BASE_URL = "https://api.unsplash.com/search/photos";

  try {
    for (let i = 0; i < portfolioItems.length; i++) {
      const img = portfolioItems[i];
      const searchTerm = img.getAttribute("data-search");

      if (searchTerm) {
        const response = await fetch(
          `${BASE_URL}?query=${encodeURIComponent(
            searchTerm
          )}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const imageData = data.results[0];
            img.src = imageData.urls.regular;
            img.alt = imageData.alt_description || img.alt;
          }
        }
      }
    }
  } catch (error) {
    console.log("Error fetching project images:", error);
  }
}

function renderProjectsGrid() {
  const grid = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");
  const seeMore = document.getElementById("projects-see-more");
  if (!grid) return;

  grid.innerHTML = "";
  const toShow = PROJECTS_STATE.filtered.slice(0, PROJECTS_STATE.currentShown);

  if (toShow.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }

  toShow.forEach((p) => {
    const card = document.createElement("div");
    card.className = "portfolio-item";

    const img = document.createElement("img");
    img.alt = p.title;
    img.loading = "lazy";
    img.setAttribute("data-search", p.query);

    const overlay = document.createElement("div");
    overlay.className = "portfolio-overlay";
    const h3 = document.createElement("h3");
    h3.textContent = p.title;
    const desc = document.createElement("p");
    desc.textContent = p.description + (p.details ? ` • ${p.details}` : "");

    overlay.appendChild(h3);
    overlay.appendChild(desc);
    card.appendChild(img);
    card.appendChild(overlay);
    grid.appendChild(card);
  });

  if (PROJECTS_STATE.currentShown >= PROJECTS_STATE.filtered.length) {
    if (seeMore) seeMore.style.display = "none";
  } else {
    if (seeMore) seeMore.style.display = "inline-block";
  }
}

function updateNavCategoryLabel() {
  const el = document.getElementById("nav-category-label");
  if (!el) return;
  const base =
    PROJECTS_STATE.category === "all"
      ? "All category"
      : PROJECTS_STATE.category + " category";
  if (PROJECTS_STATE.query && PROJECTS_STATE.query.trim() !== "") {
    el.textContent = `Results for "${PROJECTS_STATE.query.trim()}"`;
  } else {
    el.textContent = base;
  }
}

function applyProjectsFilters() {
  const q = PROJECTS_STATE.query.trim().toLowerCase();
  PROJECTS_STATE.filtered = PROJECTS_DATA.filter((p) => {
    const catOk =
      PROJECTS_STATE.category === "all" ||
      p.category === PROJECTS_STATE.category;
    const text = `${p.title} ${p.description} ${p.details || ""}`.toLowerCase();
    const qOk = q === "" || text.includes(q);
    return catOk && qOk;
  });
  PROJECTS_STATE.currentShown = Math.min(
    PROJECTS_STATE.pageSize,
    PROJECTS_STATE.filtered.length
  );
  renderProjectsGrid();
  updateNavCategoryLabel();
  setTimeout(loadPortfolioImages, 0);
}

function initProjectsControls() {
  const chips = document.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      PROJECTS_STATE.category = chip.getAttribute("data-category");
      PROJECTS_STATE.query = "";
      const search = document.getElementById("projects-search");
      if (search) search.value = "";
      applyProjectsFilters();
    });
  });

  const search = document.getElementById("projects-search");
  if (search) {
    let t;
    search.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        PROJECTS_STATE.query = search.value || "";
        applyProjectsFilters();
      }, 250);
    });
  }

  const seeMore = document.getElementById("projects-see-more");
  if (seeMore) {
    seeMore.addEventListener("click", () => {
      PROJECTS_STATE.currentShown = Math.min(
        PROJECTS_STATE.currentShown + PROJECTS_STATE.pageSize,
        PROJECTS_STATE.filtered.length
      );
      renderProjectsGrid();
      setTimeout(loadPortfolioImages, 0);
    });
  }
}

// Initialize all functionality
window.addEventListener("load", () => {
  console.log("Script loaded successfully!");

  // Initialize core modules
  initNavigation();
  initCarousel();
  initForms();
  updateFooterInfo();

  // Test footer functionality
  setTimeout(testLastModified, 100);

  // Initialize projects page if present
  const grid = document.getElementById("projects-grid");
  if (grid) {
    PROJECTS_STATE.currentShown = Math.min(
      PROJECTS_STATE.pageSize,
      PROJECTS_STATE.filtered.length
    );
    initProjectsControls();
    applyProjectsFilters();
    initModal();

    // Add portfolio click handlers after projects are rendered
    setTimeout(() => {
      addPortfolioClickHandlers(PROJECTS_DATA);
    }, 200);
  }

  // Initialize dynamic image loading
  loadPortfolioImages();
});
