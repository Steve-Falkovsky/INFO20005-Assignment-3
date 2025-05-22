/**
 * Fetches an HTML fragment and injects it into the page.
 * @param {string} id  – the ID of the container element
 * @param {string} url – path to fragment HTML
 */

function loadFragment(id, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then(html  => document.getElementById(id).innerHTML = html)
    .catch(err   => console.error(`Error loading ${url}:`, err));
}

// When the DOM is ready, load header & footer
document.addEventListener('DOMContentLoaded', () => {
  loadFragment('site-header', 'components/header.html');
  loadFragment('site-footer', 'components/footer.html');
});
