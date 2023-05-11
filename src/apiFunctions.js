import { buildPage, toggleLoader } from './domFunctions';

async function getWeather(loc) {
  toggleLoader();
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=400f15b7cc534eb7850174113230505&q=${loc}&days=7&aqi=no&alerts=no`, { mode: 'cors' });
  let weather = await response.json();
  return weather;
}

function updatePage(loc) {
  getWeather(loc).then((weather) => {
    console.log(weather);
    buildPage(weather);
  })
    .catch(() => {
      location.textContent = 'Location Not Found!';
    });
}

export { updatePage, toggleLoader };
