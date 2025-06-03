document.addEventListener('DOMContentLoaded', () => {
  fetch('data/products.json') 
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(products => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('product');
      const productData = products[productId];

      if (productData) {
        // Update main product image and alt text
        const productImage = document.querySelector('.product-image img');
        if (productImage) {
          productImage.src = productData.image;
          productImage.alt = productData.name;
        }

        // Update product name
        const productNameH1 = document.querySelector('.product-details h1');
        if (productNameH1) {
          productNameH1.textContent = productData.name;
        }

        // Update title of the page
        document.title = productData.name + " | Music Swop Shop";

        // Update price
        const productPrice = document.querySelector('.product-details .price');
        if (productPrice) {
          productPrice.textContent = productData.price;
        }

        // Update tags
        const tagsContainer = document.querySelector('.product-details .tags');
        if (tagsContainer) {
          tagsContainer.innerHTML = ''; // Clear existing tags
          productData.tags.forEach(tagText => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tagText;
            tagsContainer.appendChild(span);
          });
        }

        // Update description accordion
        const descriptionContent = document.querySelector('#descriptionAccordion .accordion-content p');
        if (descriptionContent) {
          descriptionContent.textContent = productData.description;
        }

        // Update specifications accordion
        const specificationsList = document.querySelector('#specificationsAccordion .accordion-content ul');
        if (specificationsList) {
          specificationsList.innerHTML = ''; // Clear existing specs
          for (const [key, value] of Object.entries(productData.specifications)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            specificationsList.appendChild(li);
          }
        }

        // Update features accordion
        const featuresContent = document.querySelector('#featuresAccordion .accordion-content p');
        if (featuresContent) {
          featuresContent.textContent = productData.features;
        }

      } else {
        // Handle product not found - display a message or redirect
        const productDetailsContainer = document.querySelector('.product-details');
        if (productDetailsContainer) {
          productDetailsContainer.innerHTML = '<h1>Product not found</h1><p>Sorry, the product you are looking for does not exist.</p><a href="index.html">Go to Homepage</a>';
        }
        document.title = "Product Not Found | Music Swop Shop";
      }
    })
    .catch(error => {
      console.error('Error fetching or parsing product data:', error);
      const productDetailsContainer = document.querySelector('.product-details');
      if (productDetailsContainer) {
        productDetailsContainer.innerHTML = '<h1>Error loading product data</h1><p>Sorry, we could not load the product information at this time.</p><a href="index.html">Go to Homepage</a>';
      }
      document.title = "Error | Music Swop Shop";
    });
});