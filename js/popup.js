document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("welcomePopup");
  const closeButton = document.getElementById("closePopupButton");

  // Check if the user has visited before
  if (!localStorage.getItem("siteVisited")) {
    if (popupOverlay) {
      // Show the popup
      popupOverlay.style.display = "flex"; // Make it visible for transition
      setTimeout(() => {
        // Allow display change to register before transition
        popupOverlay.classList.add("visible");
      }, 10);
    }
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      if (popupOverlay) {
        popupOverlay.classList.remove("visible");
        // Wait for transition to finish before hiding
        setTimeout(() => {
          popupOverlay.style.display = "none";
        }, 300); // Match transition duration
      }
      // Mark site as visited
      localStorage.setItem("siteVisited", "true");
    });
  }

  // Optional: Close popup if user clicks outside the content area
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (event) => {
      if (event.target === popupOverlay) {
        // Check if click is on the overlay itself
        if (closeButton) {
          closeButton.click(); // Simulate click on close button
        }
      }
    });
  }
});

// const dlg = document.getElementById('cartDialog');
// document.querySelector('.add-to-cart')
//         .addEventListener('click', () => dlg.showModal());

// // light-dismiss on backdrop-click
// dlg.addEventListener('click', (e) => {
//     // if you click anywhere outside the dialog’s content, `e.target` is the <dialog> itself
//     if (e.target === dlg) {
//         dlg.close();
//     }
// });  // backdrop clicks close the dialog

const dlg = document.getElementById("cartDialog");
const modalContent = dlg.querySelector(".modal-content");
const btn = document.querySelector(".action-button");

btn.addEventListener("click", () => dlg.showModal());

// prevent clicks inside the box from closing it
modalContent.addEventListener("click", (e) => e.stopPropagation());

// any click that reaches the <dialog> itself is on the backdrop
dlg.addEventListener("click", () => dlg.close());
