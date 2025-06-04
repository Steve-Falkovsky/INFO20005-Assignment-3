import { refreshCartIcon } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const deliveryPickupInfoElement = document.getElementById(
    "delivery-pickup-info"
  );
  const selectedOptionText = localStorage.getItem("selectedDeliveryOptionText");

  if (deliveryPickupInfoElement) {
    if (selectedOptionText) {
      if (selectedOptionText.toLowerCase().includes("pickup")) {
        deliveryPickupInfoElement.textContent = `Your order will be: ${selectedOptionText}`;
      } else if (selectedOptionText.toLowerCase().includes("delivery")) {
        deliveryPickupInfoElement.textContent = `Your order includes: ${selectedOptionText}`;
      } else {
         deliveryPickupInfoElement.textContent = selectedOptionText;
      }
    } else {
      deliveryPickupInfoElement.textContent =
        "Your delivery/pickup details will be confirmed shortly."; // Fallback
    }
  }

  // Refresh the cart icon (as cart was cleared in checkout.js)
  refreshCartIcon();
});