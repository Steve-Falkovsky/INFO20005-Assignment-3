// ---------- product.js ----------
document.addEventListener("DOMContentLoaded", () => {
  // ——— UTILITY: get array from localStorage (or empty array)
  function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  }

  // ——— UTILITY: save array back to localStorage
  function saveCartItems(arr) {
    localStorage.setItem("cartItems", JSON.stringify(arr));
  }

  // ——— UPDATE CART BADGE + ICON
  function refreshCartIcon() {
    const cartLink = document.querySelector(".cart");
    if (!cartLink) return;
    const badge = cartLink.querySelector(".badge");
    const img = cartLink.querySelector("img");
    const items = getCartItems();
    const count = items.length;

    // update badge text
    if (badge) badge.textContent = count;

    // swap icon if there's at least one item
    if (count > 0 && img && img.src.includes("icons/homepage/empty_cart.png")) {
      img.src = img.src.replace(
        "icons/homepage/empty_cart.png",
        "icons/homepage/cart.png"
      );
      img.alt = "Cart (items inside)";
    }
  }

  // ——— INITIALIZE BADGE/ICON ON PAGE LOAD
  refreshCartIcon();

  // ——— “Add to Cart” BUTTON HANDLER
  const addBtn = document.querySelector(".action-button");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      // 1. Collect product data from the DOM
      const productImageEl = document.querySelector(".product-image img");
      const titleEl = document.querySelector(".product-details h1");
      const priceEl = document.querySelector(".product-details .price");
      const tagEls = document.querySelectorAll(".product-details .tags .tag");

      const imageSrc = productImageEl ? productImageEl.getAttribute("src") : "";
      const title = titleEl ? titleEl.textContent.trim() : "";
      const price = priceEl ? priceEl.textContent.trim() : "";
      // gather all tags, join by comma + space
      const subtitles = Array.from(tagEls).map((el) => el.textContent.trim());
      const subtitle = subtitles.join(", ");

      // 2. Push into cartItems array
      const currentCart = getCartItems();
      currentCart.push({
        imageSrc: imageSrc,
        title: title,
        subtitle: subtitle,
        price: price,
      });
      saveCartItems(currentCart);

      // 3. Immediately refresh badge + icon
      refreshCartIcon();
    });
  }
});
