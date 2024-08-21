const apiKey = 'your_openweather_api_key_here';  // Replace with your OpenWeather API key
const weatherDisplay = document.getElementById('weatherDisplay');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert('Unable to retrieve weather data. Please check the location and try again.');
            console.error(error);
        });
}

function displayWeather(data) {
    weatherDisplay.innerHTML = `
        <div class="weather-box">
            <div class="circle">
                <h2>${Math.round(data.main.temp)}°C</h2>
            </div>
            <p>${data.weather[0].description}</p>
            <h2>${data.name}</h2>
        </div>
        <div class="weather-box">
            <div class="circle">
                <h2>${data.main.humidity}%</h2>
            </div>
            <p>Humidity</p>
        </div>
        <div class="weather-box">
            <div class="circle">
                <h2>${Math.round(data.wind.speed)} m/s</h2>
            </div>
            <p>Wind Speed</p>
        </div>
    `;
}

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

// Optionally, fetch weather for the user's current location on page load
// Uncomment the code below if you want to auto-fetch based on user location
/*
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert('Unable to retrieve weather data.');
            console.error(error);
        });
});
*/
