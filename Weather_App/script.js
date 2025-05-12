function getUserLocation() {
  const UserLocation = document.getElementById("location").value;
  const WEATHER_API_KEY = "1a1698517d5fb0fbf321a2611bcc994f"; 
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${UserLocation}&appid=${WEATHER_API_KEY}&units=metric`;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${UserLocation}&appid=${WEATHER_API_KEY}&units=metric`;


  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

     
      console.log(data);

      
      const temp = Math.round(data.main.temp);
      document.getElementById("temperature").textContent = `${temp}°C`;

      
      document.querySelector(".city").textContent = `${data.name}, ${data.sys.country}`;
      document.querySelector(".weather-now p").textContent = data.weather[0].description;
      
      
      const iconCode = data.weather[0].icon;
      document.querySelector(".weather_icon").style.backgroundImage =
        `url("https://openweathermap.org/img/wn/${iconCode}@2x.png")`;

     
      const feelsLike = Math.round(data.main.feels_like);
      document.getElementById("feelslike").textContent = `Feels like: ${feelsLike}°C`;  
      
      const humidity = data.main.humidity;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
     
      const windSpeed = Math.round(data.wind.speed);
      document.getElementById("wind").textContent = `Wind: ${windSpeed} km/s`;
      
      const visibilityInKm = (data.visibility / 1000).toFixed(1); 
      document.getElementById("visibility").textContent = `${visibilityInKm} km`;

      const cloud = (data.clouds.all);
      document.getElementById("clouds").textContent = `clouds: ${cloud}% `;

      function updateDate() {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = now.toLocaleDateString(undefined, options);
      document.getElementById("date").textContent = formattedDate;
      }
      const sunriseX = data.sys.sunrise;
      const sunsetX = data.sys.sunset;

      
      const sunriseDate = new Date(sunriseX * 1000);
      const sunsetDate = new Date(sunsetX * 1000);

      
      const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const currentTime = Math.floor(Date.now() / 1000); 
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      
      
      const cards = document.querySelectorAll(".card");
      const highlight = document.querySelectorAll(".highlight-grid div");
      const forecast=document.querySelectorAll(".forecast-day,.hourly-time");

      if (currentTime >= sunrise && currentTime < sunset) {
      // Day
      document.body.style.backgroundImage = "url('assets/images/background_day.jpg')";
      cards.forEach(card => {
      card.style.background = "linear-gradient(to bottom, rgb(129, 166, 225), #0c3364)";
      });
      highlight.forEach(card => {
      card.style.backgroundColor = "rgba(69, 203, 218, 0.5)";
      });
      forecast.forEach(card => {
      card.style.backgroundColor = "rgba(69, 203, 218, 0.5)";
      });
      } else {
     // Night
     document.body.style.backgroundImage = "url('assets/images/background_night.jpg')";
  

     cards.forEach(card => {
      card.style.backgroundColor = "rgba(0, 0, 0, 0.56)";
     });
     highlight.forEach(card => {
     card.style.backgroundColor = "rgba(57, 49, 49, 0.56)";
     });
     forecast.forEach(card => {
     card.style.backgroundColor = "rgba(57, 49, 49, 0.56)";
     });
  
}

      

      
      document.getElementById("sunrise").textContent = ` Sunrise: ${sunriseTime}`;
      document.getElementById("sunset").textContent = ` Sunset: ${sunsetTime}`;

      const pressure = data.main.pressure;
      document.getElementById("pressure").textContent = ` Pressure: ${pressure} hPa`;

fetch(FORECAST_API_URL)
  .then(res => res.json())
  .then(forecastData => {
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "";

    dailyForecasts.slice(0, 5).forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric'
      });
      const temp = Math.round(day.main.temp);
      const iconCode = day.weather[0].icon;

      const forecastHTML = `
        <div class="forecast-day">
          ${date}<br>
          <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="icon"><br>
          ${temp}°C
        </div>
      `;

      forecastContainer.innerHTML += forecastHTML;
    });
  });
fetch(FORECAST_API_URL)
  .then(res => res.json())
  .then(forecastData => {
    const today = new Date().getDate();
    const hourlyForecasts = forecastData.list.filter(item => {
      const forecastDate = new Date(item.dt_txt).getDate();
      return forecastDate === today;
    });

    const hourlyContainer = document.querySelector(".hourly");
    hourlyContainer.innerHTML = ""; 

    hourlyForecasts.forEach(hour => {
      const time = new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const temp = Math.round(hour.main.temp);
      const iconCode = hour.weather[0].icon;

      const forecastHTML = `
        <div class="hourly-time">
          ${time}<br>
          <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="icon"><br>
          ${temp}°C
        </div>
      `;
      hourlyContainer.innerHTML += forecastHTML;
    });
  });
      


updateDate();
    })
    .catch(err => {
      console.error("Error fetching weather data:", err);
    });
}
window.getUserLocation = getUserLocation;

