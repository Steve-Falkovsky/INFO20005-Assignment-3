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

  let shippingCost = 0;
  const selectedDeliveryOption = document.querySelector(
    'input[name="deliveryOption"]:checked'
  );

  if (items.length > 0 && selectedDeliveryOption) {
    switch (selectedDeliveryOption.value) {
      case "standard":
        shippingCost = 4.99;
        break;
      case "express":
        shippingCost = 12.99;
        break;
      case "pickup":
        shippingCost = 0.0;
        break;
      default:
        shippingCost = 4.99; // Default to standard if something is odd
    }
  } else if (items.length > 0) {
    // If no option is selected yet but there are items, default to standard or $0
    // Forcing a selection is better, but as a fallback:
    const defaultOption = document.getElementById("deliveryStd");
    if (defaultOption && defaultOption.checked) {
      shippingCost = 4.99;
    } else {
      shippingCost = 0.0; // Or another default if no radio is initially checked
    }
  }

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

  const placeOrderButton = document.getElementById("placeOrderBtn");

  if (items.length === 0) {
    const emptyMessage = "<p>Your cart is empty. Add items to proceed.</p>";
    if (desktopContainer) desktopContainer.innerHTML = emptyMessage;
    if (mobileContainer) mobileContainer.innerHTML = emptyMessage;

    if (placeOrderButton) {
      placeOrderButton.disabled = true;
      placeOrderButton.style.opacity = "0.5";
      placeOrderButton.style.cursor = "not-allowed";
    }
    return;
  }

  if (placeOrderButton) {
    placeOrderButton.disabled = false;
    placeOrderButton.style.opacity = "1";
    placeOrderButton.style.cursor = "pointer";
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
  displayCheckoutItems(items); // Display items first
  updateCheckoutSummary(items); // Then update summary based on items and default delivery

  // Add event listeners to delivery option radio buttons
  const deliveryOptions = document.querySelectorAll(
    'input[name="deliveryOption"]'
  );
  deliveryOptions.forEach((option) => {
    option.addEventListener("change", () => {
      updateCheckoutSummary(getCartItems()); // Recalculate summary when delivery option changes
    });
  });

  // Add event listener for the Place Order button
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      if (items.length === 0) {
        // Double check cart isn't empty before proceeding
        alert("Your cart is empty. Please add items before placing an order.");
        return;
      }
      // Get selected delivery option
      const selectedOption = document.querySelector(
        'input[name="deliveryOption"]:checked'
      );
      let deliveryInfoText = "Delivery/Pickup option not selected.";

      if (selectedOption) {
        const label = document.querySelector(
          `label[for="${selectedOption.id}"]`
        );
        if (label) {
          deliveryInfoText = label.textContent.trim();
        }
      } else {
        // If no option is selected, you might want to alert the user or prevent proceeding
        alert("Please select a delivery or pickup option.");
        return;
      }

      // Store the selected delivery option text for the confirmation page
      localStorage.setItem("selectedDeliveryOptionText", deliveryInfoText);

      // Clear the cart
      saveCartItems([]); // Save an empty array to clear the cart
      refreshCartIcon(); // Update the cart icon in the header

      // Navigate to the purchase confirmation page
      window.location.href = "purchase_confirmation.html";
    });
  }
});
