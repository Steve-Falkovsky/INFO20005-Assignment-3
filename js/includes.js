import { refreshCartIcon } from "./utils.js"; // Import refreshCartIcon

async function loadIncludes() {
  const includeElements = document.querySelectorAll("[data-include]");
  const promises = [];

  includeElements.forEach((el) => {
    const filePath = el.dataset.include;
    if (!filePath) {
      console.error("Element is missing data-include attribute value", el);
      return;
    }
    const promise = fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${filePath}: ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((html) => {
        el.innerHTML = html;
      })
      .catch((error) => {
        el.innerHTML = `<p style="color:red;">Error loading ${filePath}.</p>`;
        console.error(`Error loading include ${filePath}:`, error);
      });
    promises.push(promise);
  });

  try {
    await Promise.all(promises); // Wait for all include operations to settle (complete or fail)
  } catch (error) {
    // This catch block might not be strictly necessary if individual fetches handle their errors
    // and we want to proceed even if some includes fail.
    console.error("One or more includes failed to load.", error);
  }

  // Now that all includes are processed (or attempted), refresh the cart icon.
  // This ensures the header elements are in the DOM if the header was included.
  refreshCartIcon();
}

// Run on DOMContentLoaded or immediately if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadIncludes);
} else {
  // DOMContentLoaded has already fired, run loadIncludes directly.
  // This handles cases where includes.js might be loaded dynamically or late.
  loadIncludes();
}
