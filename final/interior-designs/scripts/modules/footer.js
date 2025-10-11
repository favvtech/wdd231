// Footer Module
export function updateFooterInfo() {
  console.log("updateFooterInfo function called"); // Debug log

  // Update current year
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll("#current-year");
  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });

  // Simple approach: Always show current date/time
  const now = new Date();
  const lastModified = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  console.log("Formatted last modified:", lastModified); // Debug log

  const lastModifiedElements = document.querySelectorAll("#last-modified");
  console.log("Found last modified elements:", lastModifiedElements.length); // Debug log

  lastModifiedElements.forEach((element) => {
    element.textContent = lastModified;
    console.log("Updated element with:", lastModified); // Debug log
  });
}

export function testLastModified() {
  const element = document.getElementById("last-modified");
  if (element) {
    console.log("✅ Element found:", element);
    console.log("✅ Current content:", element.textContent);
    return true;
  } else {
    console.log("❌ Element not found!");
    return false;
  }
}
