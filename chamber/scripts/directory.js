(function () {
  var MEMBERS_URL = "./data/members.json";
  var container = document.getElementById("members");
  var btnGrid = document.getElementById("view-grid");
  var btnList = document.getElementById("view-list");

  function setView(mode) {
    if (!container) return;
    if (mode === "grid") {
      container.classList.add("grid");
      container.classList.remove("list");
      if (btnGrid && btnList) {
        btnGrid.setAttribute("aria-pressed", "true");
        btnList.setAttribute("aria-pressed", "false");
      }
    } else {
      container.classList.add("list");
      container.classList.remove("grid");
      if (btnGrid && btnList) {
        btnGrid.setAttribute("aria-pressed", "false");
        btnList.setAttribute("aria-pressed", "true");
      }
    }
  }

  function badgeFor(level) {
    if (level === 3) return { text: "Gold Member", cls: "badge-gold" };
    if (level === 2) return { text: "Silver Member", cls: "badge-silver" };
    return { text: "Member", cls: "badge-member" };
  }

  function createCard(member) {
    // Use local images specified in members.json (placed in /images)
    var level = Number(member.membership_level) || 1;
    var badge = badgeFor(level);

    var article = document.createElement("article");
    article.className = "member-card level-" + level;

    if (member.image) {
      var media = document.createElement("div");
      media.className = "member-media";
      var banner = document.createElement("img");
      banner.loading = "lazy";
      banner.decoding = "async";
      banner.alt = (member.name || "Member") + " image";
      banner.src = "./images/" + member.image;
      banner.onerror = function () {
        if (media && media.parentNode) media.parentNode.removeChild(media);
      };
      media.appendChild(banner);
      article.appendChild(media);
    }

    var header = document.createElement("div");
    header.className = "member-header";

    // Small logo removed; using banner only to avoid mismatched assets

    var nameEl = document.createElement("h3");
    nameEl.textContent = member.name || "";
    header.appendChild(nameEl);

    var badgeEl = document.createElement("span");
    badgeEl.className = "badge " + badge.cls;
    badgeEl.textContent = badge.text;
    header.appendChild(badgeEl);

    var body = document.createElement("div");
    body.className = "member-body";

    if (member.description && level >= 2) {
      var desc = document.createElement("p");
      desc.className = "member-desc";
      desc.textContent = member.description;
      body.appendChild(desc);
    }

    var info = document.createElement("ul");
    info.className = "member-info";

    if (member.address) {
      var liAddr = document.createElement("li");
      liAddr.textContent = member.address;
      info.appendChild(liAddr);
    }
    if (member.phone) {
      var liPhone = document.createElement("li");
      liPhone.textContent = member.phone;
      info.appendChild(liPhone);
    }
    if (member.website) {
      var liWeb = document.createElement("li");
      var a = document.createElement("a");
      a.href = member.website;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Website";
      a.className = "website-link";
      liWeb.appendChild(a);
      info.appendChild(liWeb);
    }
    body.appendChild(info);

    article.appendChild(header);
    article.appendChild(body);

    return article;
  }

  function sortByMembershipDescending(list) {
    return (list || []).slice().sort(function (a, b) {
      return (
        (Number(b.membership_level) || 0) - (Number(a.membership_level) || 0)
      );
    });
  }

  async function loadMembers() {
    try {
      var res = await fetch(MEMBERS_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Network error: " + res.status);
      var data = await res.json();
      renderMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      if (container) {
        container.innerHTML = "<p>Failed to load members.</p>";
      }
      console.error(err);
    }
  }

  function renderMembers(members) {
    if (!container) return;
    container.innerHTML = "";
    var sorted = sortByMembershipDescending(members);
    sorted.forEach(function (m) {
      var level = Number(m.membership_level) || 1;
      var card = createCard(m);
      if (level === 1) {
        var body = card.querySelector(".member-body");
        var desc = body ? body.querySelector(".member-desc") : null;
        if (desc) desc.remove();
      }
      container.appendChild(card);
    });
  }

  if (btnGrid)
    btnGrid.addEventListener("click", function () {
      setView("grid");
    });
  if (btnList)
    btnList.addEventListener("click", function () {
      setView("list");
    });

  setView("grid");
  loadMembers();
})();
