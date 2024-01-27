document.addEventListener('DOMContentLoaded', function () {
    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    // Function to handle successful geolocation
    function getWeather(position) {
        const apiKey = '17ee7b50eab0eea1579074bd4e2d5e36';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        // Fetch weather data from OpenWeatherMap API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Function to display weather data
    function displayWeather(data) {
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');

        locationElement.textContent = data.name;
        temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
        descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    }

    // Function to handle geolocation errors
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }
});
