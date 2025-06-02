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


const dlg          = document.getElementById('cartDialog');
const modalContent = dlg.querySelector('.modal-content');
const btn          = document.querySelector('.action-button');

btn.addEventListener('click', () => dlg.showModal());

// prevent clicks inside the box from closing it
modalContent.addEventListener('click', e => e.stopPropagation());

// any click that reaches the <dialog> itself is on the backdrop
dlg.addEventListener('click', () => dlg.close());