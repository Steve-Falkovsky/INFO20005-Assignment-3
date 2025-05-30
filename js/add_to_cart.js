const dlg = document.getElementById('cartDialog');
document.querySelector('.add-to-cart')
        .addEventListener('click', () => dlg.showModal());

// light-dismiss on backdrop-click
dlg.addEventListener('click', (e) => {
    // if you click anywhere outside the dialog’s content, `e.target` is the <dialog> itself
    if (e.target === dlg) {
        dlg.close();
    }
});  // backdrop clicks close the dialog 