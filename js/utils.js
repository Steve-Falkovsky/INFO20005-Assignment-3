// ---------- utils.js ----------
export function getCartItems() {
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
}

export function saveCartItems(arr) {
  localStorage.setItem("cartItems", JSON.stringify(arr));
}

export function refreshCartIcon() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  const badge = cartLink.querySelector(".badge");
  const items = getCartItems();
  const count = items.length;

  if (badge) {
    // Update the badge count
    badge.textContent = count;

    // Show/hide badge based on count
    if (count > 0) {
      badge.style.display = "flex"; // or "inline-block" or your preferred display type
    } else {
      badge.style.display = "none";
    }
  }
}
