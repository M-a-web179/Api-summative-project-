document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const locationInput = document.getElementById('location');
    const loadingElement = document.getElementById('loading');
    const weatherDisplay = document.getElementById('weather-display');
    const errorElement = document.getElementById('error');
    
    // Replace with your WeatherAPI key
    const API_KEY = 'YOUR_API_KEY_HERE';
    
    searchBtn.addEventListener('click', fetchWeather);
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchWeather();
    });
    
    async function fetchWeather() {
        const location = locationInput.value.trim();
        if (!location) {
            showError('Please enter a location');
            return;
        }
        
        loadingElement.classList.remove('hidden');
        weatherDisplay.classList.add('hidden');
        errorElement.classList.add('hidden');
        
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
            );
            
            if (!response.ok) throw new Error('Location not found');
            
            const data = await response.json();
            displayWeather(data);
            
        } catch (error) {
            showError('Failed to fetch weather. Try again.');
        } finally {
            loadingElement.classList.add('hidden');
        }
    }
    
    function displayWeather(data) {
        const { location, current } = data;
        
        document.getElementById('city-name').textContent = 
            `${location.name}, ${location.country}`;
        document.getElementById('temp').textContent = current.temp_c;
        document.getElementById('condition').textContent = current.condition.text;
        document.getElementById('weather-icon').src = `https:${current.condition.icon}`;
        document.getElementById('feels-like').textContent = `${current.feelslike_c}°C`;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        document.getElementById('wind').textContent = `${current.wind_kph} km/h`;
        document.getElementById('uv').textContent = current.uv;
        
        weatherDisplay.classList.remove('hidden');
    }
    
    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
});