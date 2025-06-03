// ---------- cart.js ----------
import { getCartItems, saveCartItems, refreshCartIcon } from "./utils.js";

// Function to calculate and update order summary
function updateOrderSummary(items) {
  const subtotalElement = document.getElementById("cart-subtotal");
  const shippingElement = document.getElementById("cart-shipping");
  const totalElement = document.getElementById("cart-total");

  let subtotal = 0;
  if (items.length > 0) {
    subtotal = items.reduce((sum, item) => {
      // Assuming item.price is a string like "$1,299.00" or "$449"
      const priceString = String(item.price).replace("$", "").replace(",", "");
      return sum + parseFloat(priceString);
    }, 0);
  }

  // Determine shipping cost
  const shippingCost = items.length > 0 ? 25.0 : 0.0; // $25 shipping if items exist, else $0
  const total = subtotal + shippingCost;

  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  if (shippingElement) {
    shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
  }
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ——— INITIALIZE BADGE/ICON ON CART PAGE LOAD
  refreshCartIcon();

  // ——— BUILD CART ITEMS ON PAGE LOAD
  const container = document.querySelector(".left-container");
  const items = getCartItems(); // Get items once at the start

  if (container) {
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
        const card = document.createElement("div");
        card.className = "item-card";
        // Ensure item.price is displayed correctly, assuming it's a string like "$X,XXX.XX"
        const priceDisplay = item.price;

        card.innerHTML = `
          <img class="image" src="${item.imageSrc}" alt="${item.title}">
          <div class="item-details">
            <div class="item-title">${item.title}</div>
            <div class="item-subtitle">${item.subtitle}</div>
            <div class="item-price">${priceDisplay}</div>
            <div class="remove">
              <img src="icons/checkout/trash.png" alt="Remove"> Remove
            </div>
          </div>
        `;
        container.appendChild(card);

        // Add divider only if not the last item
        if (index < items.length - 1) {
          const hr = document.createElement("hr");
          hr.className = "divider";
          container.appendChild(hr);
        }

        // —— "Remove" BUTTON HANDLER
        const removeBtn = card.querySelector(".remove");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            const currentItems = getCartItems(); // Get fresh list of items
            // Filter out the item to be removed. Using index is okay here due to page reload.
            const updatedItems = currentItems.filter((_, i) => i !== index);
            saveCartItems(updatedItems);
            location.reload(); // Reloads the page, summary will be recalculated on next load
          });
        }
      });
    }
  }
  // Update the order summary regardless of whether the container was found or cart is empty
  updateOrderSummary(items);
});
