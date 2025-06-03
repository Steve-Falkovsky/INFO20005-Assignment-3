// ---------- cart.js ----------
document.addEventListener("DOMContentLoaded", () => {
  // ——— UTILITY: get array from localStorage (or empty array)
  function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  }

  // ——— UTILITY: save array back to localStorage
  function saveCartItems(arr) {
    localStorage.setItem("cartItems", JSON.stringify(arr));
  }

  // ——— UPDATE CART BADGE + ICON (same logic as product.js)
  function refreshCartIcon() {
    const cartLink = document.querySelector(".cart");
    if (!cartLink) return;
    const badge = cartLink.querySelector(".badge");
    const img = cartLink.querySelector("img");
    const items = getCartItems();
    const count = items.length;

    if (badge) badge.textContent = count;
    if (count > 0 && img && img.src.includes("empty_cart.png")) {
      img.src = img.src.replace("empty_cart.png", "full_cart.png");
      img.alt = "Cart (items inside)";
    }
  }

  // ——— BUILD CART ITEMS ON PAGE LOAD
  const container = document.querySelector(".left-container");
  if (container) {
    const items = getCartItems();
    container.innerHTML = ""; // clear any placeholder

    items.forEach((item, index) => {
      // Create a single item card
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <img class="image" src="${item.imageSrc}" alt="${item.title}">
        <div class="item-details">
          <div class="item-title">${item.title}</div>
          <div class="item-subtitle">${item.subtitle}</div>
          <div class="item-price">${item.price}</div>
          <div class="remove">
            <img src="icons/checkout/trash.png" alt="Remove"> Remove
          </div>
        </div>
      `;
      // APPEND card + divider
      container.appendChild(card);
      const hr = document.createElement("hr");
      hr.className = "divider";
      container.appendChild(hr);

      // —— OPTIONAL: “Remove” BUTTON HANDLER
      const removeBtn = card.querySelector(".remove");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          // remove this item from the array and re-render
          const updated = getCartItems().filter((_, i) => i !== index);
          saveCartItems(updated);
          // reload the cart page (or you could rebuild the DOM in place)
          location.reload();
        });
      }
    });
  }

  // ——— INITIALIZE BADGE/ICON ON CART PAGE LOAD
  refreshCartIcon();
});
