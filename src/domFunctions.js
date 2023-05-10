import { getCustomIcon, getLegitIcon } from './images';

function clear(item) {
  if (document.querySelector(item)) {
    document.querySelector(item).remove();
  }
}

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

function buildCurrent(todayObj, forecast) {
  // clear today
  clear('.today-current');
  // get container
  const todayContainer = document.querySelector('.todays-weather');
  // create today-current
  const container = document.createElement('div');
  container.classList.add('today-current');
  container.textContent = 'Current Weather';
  todayContainer.appendChild(container);
  // current temp
  buildTodayOne(container, 'Temperature', todayObj.temp_f, 'c01');
  // chance of rain
  const rain = forecast.forecastday[0].day.daily_chance_of_rain;
  buildTodayOne(container, 'Rain', rain, 'c03');
  // humidity
  buildTodayOne(container, 'Humidity', todayObj.humidity, 'c04');
  // wind
  buildTodayOne(container, 'Wind', todayObj.wind_mph, 'c02');
}

function buildDaily(forecast) {
  // clear daily
  clear('.today-daily');
  // get container
  const todayContainer = document.querySelector('.todays-weather');
  // create today-daily
  const container = document.createElement('div');
  container.classList.add('today-daily');
  container.textContent = 'Daily Summary';
  todayContainer.appendChild(container);
  // day var
  const day = forecast.forecastday[0];
  // high temp
  buildTodayOne(container, 'High Temp', day.day.maxtemp_f, 'h01');
  // low temp
  buildTodayOne(container, 'Low Temp', day.day.mintemp_f, 'l01');
  // chance of rain
  buildTodayOne(container, 'Chance of Rain', day.day.daily_chance_of_rain, 'c03');
  // humidity
  buildTodayOne(container, 'Avg Humidity', day.day.avghumidity, 'c04');
  // wind
  buildTodayOne(container, 'High Wind', day.day.maxwind_mph, 'c02');
}

function buildForecast(forecast) {
  // clear forecast
  clear('forecast');
  // get container
  const content = document.querySelector('.content');
  // create forecast-container
  const container = document.createElement('div');
  container.classList.add('forecast');
  content.appendChild(container);
  // create daily
  forecast.forecastday.forEach(day => {
    buildForecastOne(container, day);
  });
}

function buildForecastOne(container, data) {
  // create structure
  const forecastDaily = document.createElement('div');
  const date = document.createElement('div');
  const condition = document.createElement('div');
  const icon = document.createElement('icon');
  const dataContainer = document.createElement('div');
  const tempContainer = document.createElement('div');
  const hiTemp = document.createElement('div');
  const loTemp = document.createElement('div');
  const precip = document.createElement('div');
  // append to DOM
  container.appendChild(forecastDaily);
  forecastDaily.appendChild(date);
  forecastDaily.appendChild(condition);
  forecastDaily.appendChild(icon);
  forecastDaily.appendChild(dataContainer);
  dataContainer.appendChild(tempContainer);
  dataContainer.appendChild(precip);
  tempContainer.appendChild(hiTemp);
  tempContainer.appendChild(loTemp);
  // add classes
  forecastDaily.classList.add('daily-forecast');
  date.classList.add('forecast-date');
  condition.classList.add('forecast-condition');
  icon.classList.add('forecast-icon');
  dataContainer.classList.add('forecast-data');
  tempContainer.classList.add('forecast-temp-container');
  hiTemp.classList.add('forecast-temp');
  loTemp.classList.add('forecast-temp');
  precip.classList.add('forecast-precip');
  // add data
  date.textContent = data.date;
  condition.textContent = data.day.condition.text;
  icon.innerHTML = getLegitIcon(data.day.condition.code, 1);
  hiTemp.textContent = `${data.day.maxtemp_f} °F`;
  loTemp.textContent = `${data.day.mintemp_f} °F`;
  precip.textContent = `${data.day.daily_chance_of_rain} %`;
}

function buildTodayOne(container, item, data, icon) {
  // create structure
  const condition = document.createElement('div');
  const iconContainer = document.createElement('div');
  const dataContainer = document.createElement('div');
  const description = document.createElement('div');
  const detail = document.createElement('div');
  // append to DOM
  container.appendChild(condition);
  condition.appendChild(iconContainer);
  condition.appendChild(dataContainer);
  dataContainer.appendChild(description);
  dataContainer.appendChild(detail);
  // add classes
  condition.classList.add('condition-container');
  iconContainer.classList.add('weather-icon');
  dataContainer.classList.add('data-container');
  description.classList.add('desc');
  detail.classList.add('detail');
  // add data
  description.textContent = item;
  let modifier;
  if (item === 'Temperature' || item === 'High Temp' || item === 'Low Temp') {
    modifier = '°F';
  } else if (item === 'Rain' || item === 'Humidity' || item === 'Chance of Rain' || item === 'Avg Humidity') {
    modifier = '%';
  } else {
    modifier = 'mph';
  }

  detail.textContent = `${data} ${modifier}`;
  // add icon
  iconContainer.innerHTML = getCustomIcon(icon);
}

function buildPage(weatherObj) {
  buildLocation(weatherObj.location, weatherObj.current);
  buildCurrent(weatherObj.current, weatherObj.forecast);
  buildDaily(weatherObj.forecast);
  buildForecast(weatherObj.forecast);
}

export { buildPage };
