import { getCartItems, saveCartItems, refreshCartIcon } from "./utils.js";

// Function to calculate and update order summary on the checkout page
function updateCheckoutSummary(items) {
  const subtotalElement = document.getElementById("checkout-subtotal");
  const shippingElement = document.getElementById("checkout-shipping");
  const totalElement = document.getElementById("checkout-total");

  let subtotal = 0;
  if (items.length > 0) {
    subtotal = items.reduce((sum, item) => {
      const priceString = String(item.price).replace("$", "").replace(",", "");
      return sum + parseFloat(priceString);
    }, 0);
  }

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

// Function to display cart items on the checkout page
function displayCheckoutItems(items) {
  const desktopContainer = document.getElementById(
    "checkout-items-desktop-container"
  );
  const mobileContainer = document.getElementById(
    "checkout-items-mobile-container"
  );

  if (desktopContainer) desktopContainer.innerHTML = ""; // Clear placeholders
  if (mobileContainer) mobileContainer.innerHTML = ""; // Clear placeholders

  if (items.length === 0) {
    const emptyMessage = "<p>Your cart is empty. Add items to proceed.</p>";
    if (desktopContainer) desktopContainer.innerHTML = emptyMessage;
    if (mobileContainer) mobileContainer.innerHTML = emptyMessage;
    // Optionally disable the "Place Order" button or redirect
    const placeOrderButton = document.querySelector(
      ".right-container .action-button"
    );
    if (placeOrderButton) {
      placeOrderButton.disabled = true;
      placeOrderButton.style.opacity = "0.5";
      placeOrderButton.style.cursor = "not-allowed";
    }
    return;
  }

  items.forEach((item) => {
    const itemHTML = `
      <div class="item-card">
        <img src="${item.imageSrc}" alt="${item.title}" />
        <div class="item-details">
          <div class="item-header">
            <span class="item-title">${item.title}</span>
            <span class="item-price">${item.price}</span>
          </div>
          <div class="item-subtitle">${item.subtitle}</div>
        </div>
      </div>
    `;
    if (desktopContainer)
      desktopContainer.insertAdjacentHTML("beforeend", itemHTML);
    if (mobileContainer)
      mobileContainer.insertAdjacentHTML("beforeend", itemHTML);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  refreshCartIcon(); // Update cart icon in header

  const items = getCartItems();
  displayCheckoutItems(items);
  updateCheckoutSummary(items);

  // Open the "Item Summary" accordion by default if there are items
  // and it's likely a mobile view (though this is a simple check)
  if (items.length > 0) {
    const allItemsAccordion = document.querySelector(
      "details.accordion.all-items"
    );
    if (allItemsAccordion && window.innerWidth < 768) {
      // 768px is a common breakpoint for mobile/tablet
      // allItemsAccordion.open = true; // This might be too aggressive, depends on UX preference
    }
  }

  // --- Add event listener for the Place Order button ---
  const placeOrderButton = document.getElementById("placeOrderBtn");
  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", () => {
      // Clear the cart items from localStorage
      saveCartItems([]); // Save an empty array to clear the cart

      // Refresh the cart icon in the header to show 0
      refreshCartIcon();
    });
  }
});
