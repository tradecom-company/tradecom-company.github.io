
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('paymentForm');
  const message = document.getElementById('paymentMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accountType = document.getElementById('accountType').value;
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const plan = document.getElementById('plan').value;

    // Simple validation
    if (!accountType || !phoneNumber || !plan) {
      message.textContent = "Please fill in all fields.";
      message.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountType,
          phoneNumber,
          plan
        })
      });
const result = await response.json();

      if (response.ok) {
        message.textContent = 'Payment initiated successfully. Check your phone.';
        message.style.color = 'green';
      } else {
        message.textContent = result.error || 'Payment failed. Try again.';
        message.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      message.textContent = 'Server error. Please try later.';
      message.style.color = 'red';
    }
  });
});






document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const statusDiv = document.getElementById("paymentStatus");

  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();
    const accountType = document.getElementById("accountType").value;
    const plan = document.getElementById("plan").value;

    // Validate Safaricom number format
    if (!/^078̣$/.test(phone)) {
      statusDiv.textContent = "Please enter a valid Safaricom number (e.g., 0712345678)";
      statusDiv.style.color = "red";
      return;
    }

    // Show loading message
    statusDiv.textContent = "Processing payment, please wait...";
    statusDiv.style.color = "#007bff";

    try {
      const response = await fetch("http://localhost:5000/api/mpesa/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          accountType,
          plan
        })
      });

      const result = await response.json();

      if (response.ok) {
        statusDiv.textContent = "Payment request sent. Check your phone to complete.";
        statusDiv.style.color = "green";
      } else {
        statusDiv.textContent = result.message || "Payment failed. Try again.";
        statusDiv.style.color = "red";
      }
    } catch (error) {
      console.error("Payment Error:", error);
      statusDiv.textContent = "Something went wrong. Please try again later.";
      statusDiv.style.color = "red";
    }
  });
});




