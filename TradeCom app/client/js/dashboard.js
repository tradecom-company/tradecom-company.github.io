

//: Countdown JavaScript Logic

// `client/js/dashboard.js`:

document.addEventListener("DOMContentLoaded", () => {
  const countdownDisplay = document.getElementById("countdown-timer");
  const renewBtn = document.getElementById("renew-btn");

  const userData = JSON.parse(localStorage.getItem("userData")); // or fetch from API

  if (!userData || !userData.paymentExpiresAt) {
    countdownDisplay.innerText = "Unknown";
    return;
  }

  const expiryDate = new Date(userData.paymentExpiresAt);

  const updateCountdown = () => {
    const now = new Date();
    const diff = expiryDate - now;

    if (diff <= 0) {
      countdownDisplay.innerText = "Expired";
      countdownDisplay.style.color = "red";
      renewBtn.style.display = "inline-block";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownDisplay.innerText = `daysd{hours}h minutesm{seconds}s`;

    // Show Renew button if less than 3 days left
    if (days < 3) {
      renewBtn.style.display = "inline-block";
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Button click redirects to payment
  renewBtn.addEventListener("click", () => {
    window.location.href = "/client/pages/payment.html"; // Adjust if your route differs
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const accountType = localStorage.getItem('accountType'); // or fetched from API

  if (accountType === 'normal') {
    document.getElementById('business-section').style.display = 'none';
    document.getElementById('delivery-section').style.display = 'none';
} else if (accountType === 'business') {
    document.getElementById('normal-section').style.display = 'none';
    document.getElementById('delivery-section').style.display = 'none';
  } else if (accountType === 'delivery') {
    document.getElementById('normal-section').style.display = 'none';
    document.getElementById('business-section').style.display = 'none';
  }
});





