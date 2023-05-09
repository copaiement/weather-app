import { getLegitIcon } from "./images";

function buildLocation(locationObj, todayObj) {
  const locationName = document.querySelector('.location-name');
  const locationSub = document.querySelector('.location-sub');
  const overview = document.querySelector('.weather-overview');
  const icon = document.querySelector('.weather-icon');

  locationName.textContent = locationObj.name;
  if (locationObj.region) {
    locationSub.textContent = `${locationObj.region}, ${locationObj.country}`;
  } else {
    locationSub.textContent = locationObj.country;
  }

  overview.textContent = todayObj.condition.text;
  icon.innerHTML = getLegitIcon(todayObj.condition.code, todayObj.is_day);

}

function buildToday(today) {

}

function buildForecast(forecast) {

}

export { buildLocation, buildToday, buildForecast };
