import './style.css';

// weather API Key:
// 400f15b7cc534eb7850174113230505

// full request URL
// https://api.weatherapi.com/v1/current.json?key=400f15b7cc534eb7850174113230505&q=london

// modifiers:
// q=ZIP CODE
// q=auto:ip *Lookup location by IP

async function getWeather(loc) {
  let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=400f15b7cc534eb7850174113230505&q=${loc}`, { mode: 'cors' });
  let weather = await response.json();
  console.log(weather);
  updatePage(weather);
}

function updatePage(weather) {
  const location = document.querySelector('.location');
  const temp = document.querySelector('.current-temp');
  const windSpeed = document.querySelector('.wind-speed');
  const windDirection = document.querySelector('.wind-direction');

  location.textContent = weather.location.name;
  temp.textContent = weather.current.temp_f;
  windSpeed.textContent = weather.current.wind_mph;
  windDirection.textContent = weather.current.wind_dir;
}

getWeather('auto:ip');
