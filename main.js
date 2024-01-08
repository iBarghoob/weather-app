import config from './config';

const apiKey = config.apiKEY;

const form = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

form.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getData(city);
            displayData(weatherData);
        } catch (error) {
            console.log(error);
            displayError(error.message);
        }
    } else {
        displayError("Enter a city !");
    }
});

async function getData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Error, could not get weather data");
    }

    return await response.json();
}

function displayData(data) {
    clearCard();
    card.style.display = "flex";

    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    createAndAppend("h1", "cityDisplay", city, card);
    createAndAppend("p", "temperatureDisplay", `${(temp - 273.15).toFixed(1)}°C`, card);
    createAndAppend("p", "humidityDisplay", `Humidity: ${humidity}%`, card);
    createAndAppend("p", "descriptionDisplay", `Weather: ${description}`, card);
    createAndAppend("p", "weatherEmoji", getEmoji(id), card);
}

function clearCard() {
    card.textContent = "";
}

function createAndAppend(elementType, className, text, parent) {
    const element = document.createElement(elementType);
    element.textContent = text;
    element.classList.add(className);
    parent.appendChild(element);
}

function getEmoji(weatherID) {
    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case (weatherID >= 600 && weatherID < 700):
            return "❄️";
        case (weatherID >= 700 && weatherID < 800):
            return "🌫️";
        case (weatherID === 800):
            return "☀️";
        case (weatherID >= 801 && weatherID < 810):
            return "☁️";
        default:
            return "❔";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    clearCard();
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
