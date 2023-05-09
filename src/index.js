import './style.css';

import { getLegitIcon } from './domFunctions';
// weather API Key:
// 400f15b7cc534eb7850174113230505

// full request URL
// https://api.weatherapi.com/v1/current.json?key=400f15b7cc534eb7850174113230505&q=london

// modifiers:
// q=ZIP CODE
// q=auto:ip *Lookup location by IP

const submitBtn = document.querySelector('#submit-loc');
submitBtn.addEventListener('click', getLoc);

function getLoc() {
  const input = document.querySelector('#loc');
  if (validateInput(input)) {
    updatePage(input.value);
  }
}

function validateInput(input) {
  const regexCity = /^[a-z\s]{2,}$/gi;
  const regexZip = /([0-9]{5})/g;
  if (regexCity.test(input.value)) {
    return true;
  }
  if (regexZip.test(input.value)) {
    return true;
  }
  input.setCustomValidity('Please enter a valid City or ZIP Code');
  input.reportValidity();
  return false;
}

async function getWeather(loc) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=400f15b7cc534eb7850174113230505&q=${loc}&days=7&aqi=no&alerts=no`, { mode: 'cors' });
  let weather = await response.json();
  return weather;
}

function updatePage(loc) {
  const location = document.querySelector('.location');
  const temp = document.querySelector('.current-temp');
  const windSpeed = document.querySelector('.wind-speed');
  const windDirection = document.querySelector('.wind-direction');

  getWeather(loc).then((weather) => {
    console.log(weather);
    location.textContent = weather.location.name;
    temp.textContent = weather.current.temp_f;
    windSpeed.textContent = weather.current.wind_mph;
    windDirection.textContent = weather.current.wind_dir;
    const icon = document.createElement('div');
    const body = document.querySelector('body');
    body.appendChild(icon);
    icon.classList.add('icon');
    icon.innerHTML = getLegitIcon(weather.current.condition.code, weather.current.is_day);
  })
    .catch(() => {
      location.textContent = 'Location Not Found!';
    });
}

function initialize() {
  updatePage('auto:ip');
}

initialize();
