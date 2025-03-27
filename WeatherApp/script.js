document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const locationInput = document.getElementById('location');
    const weatherData = document.getElementById('weather-data');

    if (!window.location.hostname.includes('mugisha.tech')) {
        weatherData.innerHTML = '<p style="color:red">This app only works on mugisha.tech</p>';
        return; 
    }

    searchBtn.addEventListener('click', fetchWeather);
    locationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') fetchWeather();
    });

    async function fetchWeather() {
        const location = locationInput.value.trim();
        if (!location) {
            weatherData.innerHTML = '<p>Please enter a location</p>';
            return;
        }

        weatherData.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading weather data...</p>
            </div>
        `;

        try {

            const response = await fetch(
                `https://weather-proxy.m-ainomugis.workers.dev?location=${encodeURIComponent(location)}`
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            displayWeather(data);
            
        } catch (error) {
            console.error('Fetch error:', error);
            weatherData.innerHTML = `
                <p style="color: red">Weather service unavailable</p>
                <p><small>${error.message.replace('API error: ', '')}</small></p>
                <button onclick="fetchWeather()">Retry</button>
            `;
        }
    }

    function displayWeather(data) {
        if (!data || !data.current || !data.location) {
            weatherData.innerHTML = '<p>Invalid weather data received</p>';
            return;
        }

        const { current, location } = data;
        
        weatherData.innerHTML = `
            <h2>${location.name}, ${location.country}</h2>
            <p>${location.localtime}</p>
            
            <div class="weather-main">
                <img src="${current.condition.icon}" 
                     alt="${current.condition.text}" 
                     class="weather-icon">
                <span class="temp">${current.temp_c}°C</span>
            </div>
            <p>${current.condition.text}</p>
            
            <div class="weather-details">
                <div class="detail-item">
                    <span class="detail-label">Feels Like:</span>
                    <span>${current.feelslike_c}°C</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Humidity:</span>
                    <span>${current.humidity}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Wind Speed:</span>
                    <span>${current.wind_kph} km/h</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">UV Index:</span>
                    <span>${current.uv}</span>
                </div>
            </div>
        `;
    }
});