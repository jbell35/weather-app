
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "21726ab382f07f62edc2eedb71b5ad16"; //normally hidden

weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); //prevents the page from refreshing

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);

    console.log(response);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();

};

function displayWeatherInfo(data){

    console.log(data);

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    card.textContent = ""; //resetting text content
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");

    tempDisplay.textContent =  `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

};

function getWeatherEmoji(weatherID){

    switch(true){
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case (weatherID >= 600 && weatherID < 700):
            return "❄️"; 
        case (weatherID >= 600 && weatherID < 700):
            return "🌬️";
        case (weatherID === 800):
            return "☀️";
        case (weatherID >= 801 && weatherID < 810):
            return "☁️";

        default:
            return "❓";
    }

};


function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}