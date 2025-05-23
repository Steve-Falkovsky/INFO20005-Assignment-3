document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-include]').forEach(async el => {
    try {
      const url = el.getAttribute('data-include');
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(resp.statusText);
      el.innerHTML = await resp.text();
      // optional: mark as loaded to prevent FOUC
      el.classList.add('loaded');
    } catch (err) {
      console.error('Include failed for', el, err);
    }
  });
});
