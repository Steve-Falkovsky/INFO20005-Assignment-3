// ---------- cart.js ----------
import { getCartItems, saveCartItems, refreshCartIcon } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // ——— INITIALIZE BADGE/ICON ON CART PAGE LOAD
  refreshCartIcon();

  // ——— BUILD CART ITEMS ON PAGE LOAD
  const container = document.querySelector(".left-container");
  if (container) {
    const items = getCartItems();
    container.innerHTML = ""; // clear any placeholder

    if (items.length === 0) {
      // Show empty cart message
      container.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <a href="index.html" class="action-button">Continue Shopping</a>
        </div>
      `;
    } else {
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

        // —— "Remove" BUTTON HANDLER
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
  }
});
