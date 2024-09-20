// Initialise Feather icons
// feather.replace();

// Select all elements
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const baseCurrency = document.getElementById("baseCurrency");
const getRatesBtn = document.getElementById("getRatesBtn");
const exchangeRate = document.getElementById("exchangeRate");
const convertMode = document.getElementById("convertMode");
const exchangeMode = document.getElementById("exchangeMode");
const toggleBtns = document.querySelectorAll(".toggleBtn");

// Define the exchange rate API key
const apiKey = "";

// Set up event listener to toggle between conversion and exchange mode
toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach((btn) => btn.classList.remove("active")); // Remove active class from all buttons
    btn.classList.add("active"); // Add active class to the clicked button

    // Display or hide the appropriate UI
    const mode = btn.getAttribute("data-mode");
    if (mode === "convert") {
      convertMode.style.display = "flex";
      exchangeMode.style.display = "none";
    } else {
      convertMode.style.display = "none";
      exchangeMode.style.display = "flex";
    }
  });
});

// Convert logic
convertBtn.addEventListener("click", () => {
  // Get the value from the selected elements
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  console.log("clicked");
  ("clicked");
  // Fetch conversion rate using API
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rate; // Access conversion_rate directly from API response
      const convertedAmount = (amount * rate).toFixed(2); // Convert to 2 decimal places

      // Update the result in the UI
      result.innerHTML = `<span class="currency-icon">${to}</span> ${convertedAmount}`;
    })
    .catch((error) => {
      console.log(error);
    });
});

// Exchange rate logic
getRatesBtn.addEventListener("click", () => {
  // Get the base currency
  const base = baseCurrency.value;

  // Fetch exchange rates from the API
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`)
    .then((response) => response.json())
    .then((data) => {
      let ratesHTML = "<h3>Exchange Rates</h3><ul>";
      for (const [currency, rate] of Object.entries(data.conversion_rates)) {
        ratesHTML += `
          <li>
            <span class="currency-icon">${currency}</span> ${currency}: ${rate.toFixed(
          4
        )}
          </li>`;
      }
      ratesHTML += "</ul>";
      exchangeRate.innerHTML = ratesHTML;
    })
    .catch((error) => {
      console.log(error);
    });
});
