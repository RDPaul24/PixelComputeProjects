/* Making the box */
* {
    box-sizing: border-box;
}

/* code for the body */
body {
    margin: 0;
    min-height: 100vh;
    font-family: "Lato", sans-serif;
    background-color: #f4f4f4;
    color: #252525;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

/* Centering the page */
.page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 16px;
}

/* Yellow box configuration */
.converter-card {
    width: min(100%, 650px);
    min-height: 390px;
    padding: 48px 32px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
    background-color: #F8D800;
    border-radius: 12px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.14);
}

/* Heading configuration */
h1 {
    margin: 0 0 30px;
    font-size: clamp(1.7rem, 5vw, 2.25rem);
    font-weight: 900;
}

/* Layout configuration */
form {
    width: min(100%, 340px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
}

label {
    font-size: 0.95rem;
}

/* code for amount input and currency dropdowns to a list */
input,
select {
    width: 100%;
    min-width: 0;
    padding: 11px 12px;
    font: inherit;

    background-color: white;
    border: 1px solid #d0d0d0;
    border-radius: 6px;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
    text-shadow: none;
}

/* Highlighting input when clicked */
input:focus,
select:focus {
    outline: none;
    border-color: #555;
    box-shadow: 0 0 0 2px rgba(85, 85, 85, 0.16);
}

/* creating two dropdowns */
.currency-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    margin: 8px 0;
}

.currency-row select {
    padding: 10px 6px;
    font-size: 0.82rem;
}

.to-label {
    font-size: 0.85rem;
    font-weight: 700;
}

/* Convert button configuration */
button {
    width: 100%;
    padding: 12px 16px;

    border: none;
    border-radius: 6px;

    background-color: #007bff;
    color: white;
    font: inherit;
    font-weight: 700;

    cursor: pointer;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);

    transition: background-color 0.2s, transform 0.2s;
}

button:hover {
    background-color: #0069d9;
}

button:active {
    transform: translateY(1px);
}

button:disabled {
    opacity: 0.65;
    cursor: wait;
}

/* Conversion result */
.result {
    min-height: 1.4em;
    margin: 16px 0 0;
    font-weight: 700;
    overflow-wrap: anywhere;
}

/* Error message */
.error {
    margin: 10px 0 0;
    color: #c62828;
    font-weight: 700;
    overflow-wrap: anywhere;
}

[hidden] {
    display: none !important;
}
