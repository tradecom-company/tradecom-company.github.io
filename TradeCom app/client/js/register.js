function showForm() {
  const selected = document.getElementById("accountType").value;

  document.getElementById("normalForm").classList.add("hidden");
  document.getElementById("businessForm").classList.add("hidden");
  document.getElementById("deliveryForm").classList.add("hidden");

  if (selected === "normal") {
    document.getElementById("normalForm").classList.remove("hidden");
  } else if (selected === "business") {
    document.getElementById("businessForm").classList.remove("hidden");
  } else if (selected === "delivery") {
    document.getElementById("deliveryForm").classList.remove("hidden");
  }
}

function submitForm(event, accountType) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  fetch("http://localhost:5000/api/register", {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Registration successful!");
      form.reset();
    })
    .catch(err => {
      alert("Registration failed. Check console.");
      console.error(err);
    });
}








document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([-6.8, 39.2], 13); // Center over Dar es Salaam
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let marker;

  map.on("click", function (e) {
    const { lat, lng } = e.latlng;

    // Update hidden fields
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;

    // Place or move marker
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng]).addTo(map);
    }
  });
});
 