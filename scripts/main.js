(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var lmEl = document.getElementById("lastModified");
  if (lmEl) {
    lmEl.textContent = "Last Modified: " + document.lastModified;
  }

  // Responsive nav toggle
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      // Switch icon and aria-label between hamburger and close (X)
      if (isOpen) {
        toggle.innerHTML = "&times;";
        toggle.setAttribute("aria-label", "Close menu");
      } else {
        toggle.innerHTML = "&#9776;";
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Wayfinding: mark current page link
  var currentPath = location.pathname.split("/").pop() || "index.html";
  var links = (nav ? nav : document).querySelectorAll("a[href]");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var href = link.getAttribute("href");
    if (!href) continue;
    if (href === "#" && currentPath !== "") continue;
    if (href === currentPath || (href === "index.html" && currentPath === "")) {
      link.setAttribute("aria-current", "page");
    }
  }

  // Certificate rendering and filtering
  var coursesContainer = document.getElementById("courses");
  var creditsEl = document.getElementById("total-credits");
  var filters = document.querySelectorAll("#certificate .filters button");
  var courseDetails = document.getElementById("course-details");

  // Function to display course details in modal
  function displayCourseDetails(course) {
    if (!courseDetails) return;

    courseDetails.innerHTML = "";
    courseDetails.innerHTML =
      '<button id="closeModal">❌</button>' +
      "<h2>" +
      course.subject +
      " " +
      course.number +
      "</h2>" +
      "<h3>" +
      course.title +
      "</h3>" +
      "<p><strong>Credits</strong>: " +
      course.credits +
      "</p>" +
      "<p><strong>Certificate</strong>: " +
      course.certificate +
      "</p>" +
      "<p>" +
      course.description +
      "</p>" +
      "<p><strong>Technologies</strong>: " +
      course.technology.join(", ") +
      "</p>";

    courseDetails.showModal();

    var closeModal = document.getElementById("closeModal");
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        courseDetails.close();
      });
    }

    // Close modal when clicking outside of it
    courseDetails.addEventListener("click", function (event) {
      if (event.target === courseDetails) {
        courseDetails.close();
      }
    });
  }

  function renderCourses(list) {
    if (!coursesContainer || !Array.isArray(list)) return;
    coursesContainer.innerHTML = "";

    list.forEach(function (c) {
      var card = document.createElement("article");
      card.className =
        "course-card " +
        (c.completed ? "course-completed" : "course-incomplete");

      var h3 = document.createElement("h3");
      h3.textContent = c.subject + " " + c.number + ": " + c.title;
      var meta = document.createElement("div");
      meta.className = "course-meta";
      meta.textContent = c.credits + " credits • " + c.certificate;

      card.appendChild(h3);
      card.appendChild(meta);

      // Add click event listener to show course details
      card.addEventListener("click", function () {
        displayCourseDetails(c);
      });

      coursesContainer.appendChild(card);
    });

    // Update credits total using reduce
    if (creditsEl) {
      var total = list.reduce(function (sum, c) {
        return sum + (c.credits || 0);
      }, 0);
      creditsEl.textContent = "Total Credits: " + total;
    }
  }

  function applyFilter(type) {
    if (!Array.isArray(window.courses)) return;
    var data = window.courses;
    if (type === "WDD")
      data = data.filter(function (c) {
        return c.subject === "WDD";
      });
    else if (type === "CSE")
      data = data.filter(function (c) {
        return c.subject === "CSE";
      });
    renderCourses(data);
  }

  if (Array.isArray(window.courses)) {
    renderCourses(window.courses);
  }

  // enhance filter buttons with active state
  function setActiveFilter(targetBtn) {
    if (!filters || !filters.forEach) return;
    filters.forEach(function (b) {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    if (targetBtn) {
      targetBtn.classList.add("is-active");
      targetBtn.setAttribute("aria-pressed", "true");
    }
  }

  if (filters && filters.forEach) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var type = btn.getAttribute("data-filter");
        applyFilter(type);
        setActiveFilter(btn);
      });
    });
    // set default active to ALL if exists
    var defaultBtn = Array.prototype.find
      ? Array.prototype.find.call(filters, function (b) {
          return b.getAttribute("data-filter") === "ALL";
        })
      : null;
    if (defaultBtn) setActiveFilter(defaultBtn);
  }

  // Hero button highlight effect
  var heroButtons = document.querySelectorAll(".hero .btn");
  heroButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var href = btn.getAttribute("href");
      if (href && href.startsWith("#")) {
        var targetId = href.substring(1);
        var target = document.getElementById(targetId);
        if (target) {
          // Add highlight class
          target.classList.add("target-highlight");
          // Remove highlight class after animation
          setTimeout(function () {
            target.classList.remove("target-highlight");
          }, 1500);
        }
      }
    });
  });
})();
