const dlg          = document.getElementById('cartDialog');
const modalContent = dlg.querySelector('.modal-content');
const btn          = document.querySelector('.add-to-cart');

btn.addEventListener('click', () => dlg.showModal());

// prevent clicks inside the box from closing it
modalContent.addEventListener('click', e => e.stopPropagation());

// any click that reaches the <dialog> itself is on the backdrop
dlg.addEventListener('click', () => dlg.close());