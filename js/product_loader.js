document.addEventListener('DOMContentLoaded', () => {
  // Define product data
  const products = {
    "fenderStrat1982": {
      name: "Fender Stratocaster 1982",
      image: "images/strat.png",
      price: "$1,299",
      tags: ["Used", "Good Condition"],
      description: "Vintage 1982 Fender Stratocaster in excellent playing condition. Some wear consistent with age. Original pickups.",
      specifications: { "Body": "Alder", "Neck": "Maple", "Fingerboard": "Rosewood", "Pickups": "Original Single Coils" },
      features: "Comes with a hardshell case."
    },
    "mahaloUkelele": {
      name: "Mahalo Ukelele",
      image: "images/uke.png",
      price: "$449",
      tags: ["New", "Concert"],
      description: "A vibrant Mahalo Ukelele, perfect for beginners and seasoned players looking for a fun, portable instrument.",
      specifications: { "Body": "Sengon", "Neck": "Jabon", "Fingerboard": "Mahogany", "Strings": "Aquila Super Nylgut" },
      features: "Includes a gig bag."
    },
    "taylorGsCustom": {
      name: "Taylor GS Custom",
      image: "images/taylor.png",
      price: "$3,199",
      tags: ["Used", "Excellent Condition"],
      description: "A stunning Taylor GS Custom acoustic guitar with rich tones and beautiful craftsmanship.",
      specifications: { "Top": "Sitka Spruce", "Back & Sides": "Indian Rosewood", "Neck": "Tropical Mahogany", "Fretboard": "Ebony" },
      features: "Includes original Taylor hardshell case."
    },
    "gibsonLesPaul1978": {
      name: "Gibson Les Paul 1978",
      image: "images/gibson.png",
      price: "$4,299", // Price updated to be different from strat
      tags: ["Vintage", "Player Grade"],
      description: "A classic 1978 Gibson Les Paul Standard, delivering iconic rock tones. Shows play wear typical for its age.",
      specifications: { "Body": "Mahogany", "Top": "Maple", "Neck": "Mahogany", "Fingerboard": "Rosewood", "Pickups": "Original Humbuckers" },
      features: "Non-original hardshell case included."
    },
    "jasmineC22": {
      name: "Jasmine C22",
      image: "images/acoustic.png",
      price: "$355",
      tags: ["New", "Classical"],
      description: "The Jasmine JC-22 is a 3/4 size classical guitar that's an excellent choice for the young, aspiring player.",
      specifications: { "Top": "Spruce", "Back & Sides": "Sapele", "Neck": "Nato", "Scale Length": "23.375 inches" },
      features: "Gloss natural finish."
    },
    "jdLuthiers": {
      name: "J&D Luthiers",
      image: "images/jd.png",
      price: "$1,599",
      tags: ["Boutique", "Mint Condition"],
      description: "A finely crafted instrument from J&D Luthiers, offering exceptional playability and tone.",
      specifications: { "Body Wood": "Swamp Ash", "Neck Wood": "Roasted Maple", "Fretboard": "Rosewood", "Pickups": "Custom Hand-wound" },
      features: "Includes premium gig bag."
    },
    "fenderSquire": {
      name: "Fender Squier Stratocaster",
      image: "images/squire.png",
      price: "$499", // Adjusted price
      tags: ["New", "Beginner-Friendly"],
      description: "A great entry-level Stratocaster from Squier by Fender, offering classic looks and tones.",
      specifications: { "Body": "Poplar", "Neck": "Maple", "Fingerboard": "Indian Laurel", "Pickups": "Standard Single-Coil Strat" },
      features: "Available in multiple colors."
    },
    "fenderSrv": {
      name: "Fender SRV Stratocaster",
      image: "images/srv.png",
      price: "$2,799", // Adjusted price
      tags: ["Artist Signature", "Used"],
      description: "Fender Stevie Ray Vaughan Signature Stratocaster, built to the specs of the legendary blues guitarist.",
      specifications: { "Body": "Alder", "Neck": "Maple (Thick Oval)", "Fingerboard": "Pau Ferro", "Pickups": "Texas Special Single-Coils" },
      features: "Gold-plated hardware, left-handed tremolo."
    },
    "gretschGt567": {
      name: "Gretsch GT567 Electromatic",
      image: "images/gretsch.png",
      price: "$899", // Adjusted price
      tags: ["New", "Hollow Body"],
      description: "The Gretsch GT567 Electromatic offers classic Gretsch hollow body tones and style at an accessible price.",
      specifications: { "Body": "Laminated Maple", "Neck": "Maple", "Fingerboard": "Rosewood", "Pickups": "Black Top Filter'Tron" },
      features: "Bigsby B60 vibrato tailpiece."
    },
    "fenderPrincetonAmp": {
      name: "Fender Princeton Amp",
      image: "images/amp.png",
      price: "$449",
      tags: ["Used", "Vintage"],
      description: "Classic Fender Princeton reverb amplifier, known for its lush reverb and tremolo.",
      specifications: { "Type": "Tube", "Wattage": "12 Watts", "Speaker": "10-inch Jensen", "Effects": "Reverb, Tremolo" },
      features: "Compact and versatile."
    },
    "korgMinilogue": {
      name: "Korg Minilogue",
      image: "images/korg.png",
      price: "$799",
      tags: ["New", "Analog Synth"],
      description: "A powerful and versatile analog synthesizer with a fully programmable interface.",
      specifications: { "Polyphony": "4-voice", "Oscillators": "2 VCOs per voice", "Filter": "Analog Low-pass", "Sequencer": "16-step" },
      features: "Built-in oscilloscope display."
    }
    // Add all other products here...
  };

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
});