const API_KEY = "3b27b6bc93d2ef34411543fd";

//api extraction


const form = document.querySelector("#converter-form");
const input = document.querySelector("#amount");
const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const convertButton = document.querySelector("#convert-button");
const resultMessage = document.querySelector("#result");
const errorMessage = document.querySelector("#error");

let currencyList = [];

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    resultMessage.textContent = "";
}

const clearMessages = () => {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
    resultMessage.textContent = "";
}

const getCountryFlag = (country) => {
    const code = country.cca2;

    if (!code || code.length !== 2) {
        return country.flags?.emoji || "🏳️";
    }

    return String.fromCodePoint(
        ...[...code.toUpperCase()].map(
            letter => 127397 + letter.charCodeAt(0)
        )
    );
}

async function loadCurrencies() {
    currencyList = [
        { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
        { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩" },
        { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
        { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
        { code: "EUR", name: "Euro", flag: "🇪🇺" },
        { code: "GBP", name: "British Pound", flag: "🇬🇧" },
        { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
        { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
        { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
        { code: "USD", name: "US Dollar", flag: "🇺🇸" }
    ];

    populateDropdown(fromSelect, "USD");
    populateDropdown(toSelect, "INR");
}

const populateDropdown = (selectElement, defaultCode) => {
    if (currencyList.length === 0) {
        return;
    }

    selectElement.replaceChildren();

    currencyList.forEach(currency => {
        const option = document.createElement("option");
        option.value = currency.code;
        option.textContent =
            `${currency.flag} ${currency.code} - ${currency.name}`;
        selectElement.appendChild(option);
    });

    if (
        ![...selectElement.options].some(
            option => option.value === defaultCode
        )
    ) {
        const fallback = document.createElement("option");
        fallback.value = defaultCode;
        fallback.textContent = defaultCode;
        selectElement.appendChild(fallback);
    }

    selectElement.value = defaultCode;
}

const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

async function convertCurrency(event) {
    event.preventDefault();

    clearMessages();

    const amount = Number(input.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (
        input.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount < 0
    ) {
        showError("Please enter a valid amount of 0 or more.");
        input.focus();
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
        showError(
            "Add your ExchangeRate-API key in script.js before converting."
        );
        return;
    }

    if (fromCurrency === toCurrency) {
        resultMessage.textContent =
            `${formatNumber(amount)} ${fromCurrency} = ` +
            `${formatNumber(amount)} ${toCurrency}`;

        return;
    }

    convertButton.disabled = true;
    convertButton.textContent = "Converting...";

    try {
        const url =
            `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${encodeURIComponent(fromCurrency)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("The exchange-rate service could not be reached.");
        }

        const data = await response.json();
        if (data.result !== "success" || !data.conversion_rates) {
            throw new Error(
                data["error-type"] || "The API returned an error."
            );
        }

        const rate = data.conversion_rates[toCurrency];
        if (typeof rate !== "number") {
            throw new Error(`A rate for ${toCurrency} was not available.`);
        }

        const convertedAmount = amount * rate;
        resultMessage.textContent =
            `${formatNumber(amount)} ${fromCurrency} = ` +
            `${formatNumber(convertedAmount)} ${toCurrency}`;

    } catch (error) {
        console.error(error);
        showError("An error occurred, please try again later.");

    } finally {
        convertButton.disabled = false;
        convertButton.textContent = "Convert";
    }
}

form.addEventListener("submit", convertCurrency);

loadCurrencies();
