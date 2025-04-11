const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

async function loadCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");

    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const result = amount * rate;

    document.getElementById("result").innerText = `${amount} ${fromCurrency} يساوي ${result.toFixed(2)} ${toCurrency}`;
}

loadCurrencies();