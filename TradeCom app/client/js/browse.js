
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("hidden");
});

// Get user's location and fetch nearby products
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;

  try {
    const res = await fetch(`/api/products?lat=latitude   lng={longitude}`);
    const data = await res.json();
    displayProducts(data.products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
});

function displayProducts(products) {
  const container = document.getElementById("products-container");
  if (!products.length) {
    container.innerHTML = "<p>No products found near you.</p>";
    return;
  }

  // Group products by category
const grouped = {};
  products.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  for (let cat in grouped) {
    const section = document.createElement("section");
    section.classList.add("product-category");

    const title = document.createElement("h3");
    title.textContent = cat;
    section.appendChild(title);

    const list = document.createElement("div");
    list.classList.add("product-list");

    grouped[cat].forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="product.image" alt="{product.name}">
        <h4>product.name</h4>
        <p>{product.description}</p>
        <strong>${product.price} TZS</strong>
      `;
      list.appendChild(card);
    });

    section.appendChild(list);
    container.appendChild(section);
  }
}







document.addEventListener("DOMContentLoaded", async () => {
  const map = L.map("map").setView([0, 0], 13);
 // Set OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Get user location
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    map.setView([lat, lng], 14);
    L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();

    // Fetch shops from the server
    const response = await fetch(`/api/shops/nearby?lat=lat   lng={lng}`);
    const shops = await response.json();

    // Add shop markers
    shops.forEach(shop => {
      const marker = L.marker([shop.location.coordinates[1], shop.location.coordinates[0]]).addTo(map);
      marker.bindPopup(`
        <strong>shop.businessName</strong><br>{shop.category}<br>
        📞 shop.phone<br>
        🛍️{shop.description}
      `);
    });

  }, () => {
    alert("Unable to get your location. Enable location permissions.");
  });
});






function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `search-results.html?q={encodeURIComponent(query)}`;
  }
}





 document.addEventListener('DOMContentLoaded', async () => 
  const container = document.getElementById('product-container');

  try 
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const  latitude, longitude  = position.coords;
    const res = await fetch(`/api/products?lat={latitude}&lng=longitude`);
    const products = await res.json();

    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="{product.imageUrl || '../assets/default.png'}" alt="product.nameEnglish">
        <h3>{product.nameEnglish}</h3>
        <p>product.description</p>
        <strong>Tsh{product.price}</strong>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = "<p>Unable to load products.</p>";
    console.error(err);
  }
});


         