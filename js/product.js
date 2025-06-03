// ---------- product.js ----------
import { getCartItems, saveCartItems, refreshCartIcon } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // ——— INITIALIZE BADGE/ICON ON PAGE LOAD
  refreshCartIcon();

  // ——— "Add to Cart" BUTTON HANDLER
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

      // 3. Show the popup dialog
      const dlg = document.getElementById("cartDialog");
      if (dlg) dlg.showModal();

      // 4. Immediately refresh badge + icon
      refreshCartIcon();
    });
  }
});
