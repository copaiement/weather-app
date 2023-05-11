//import { getDay, getDate, getMonth } from 'date-fns';
import getDay from 'date-fns/getDay';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import parseJSON from 'date-fns/parseJSON';

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
  // set container to hidden
  container.classList.add('hidden');
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
  clear('.forecast');
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
  const hiTempDesc = document.createElement('div');
  const hiTemp = document.createElement('div');
  const loTempDesc = document.createElement('div');
  const loTemp = document.createElement('div');
  const precipContainer = document.createElement('div');
  const precipDesc = document.createElement('div');
  const precip = document.createElement('div');
  // append to DOM
  container.appendChild(forecastDaily);
  forecastDaily.appendChild(date);
  forecastDaily.appendChild(condition);
  forecastDaily.appendChild(icon);
  forecastDaily.appendChild(dataContainer);
  dataContainer.appendChild(tempContainer);
  dataContainer.appendChild(precipContainer);
  precipContainer.appendChild(precipDesc);
  precipContainer.appendChild(precip);
  tempContainer.appendChild(hiTempDesc);
  tempContainer.appendChild(hiTemp);
  tempContainer.appendChild(loTempDesc);
  tempContainer.appendChild(loTemp);
  // add classes
  forecastDaily.classList.add('daily-forecast');
  date.classList.add('forecast-date');
  condition.classList.add('forecast-condition');
  icon.classList.add('forecast-icon');
  dataContainer.classList.add('forecast-data-container');
  tempContainer.classList.add('forecast-data');
  precipContainer.classList.add('forecast-data');
  hiTempDesc.classList.add('data-desc');
  hiTemp.classList.add('forecast-temp');
  loTempDesc.classList.add('data-desc');
  loTemp.classList.add('forecast-temp');
  precipDesc.classList.add('data-desc');
  precip.classList.add('forecast-precip');
  
  // convert date
  const dateConv = parseJSON(`${data.date}T12:00:00`);
  const dayVal = getDOW(dateConv);
  const month = getMonthName(dateConv);
  const dateFormatted = getDateFormat(dateConv);
  // add data
  date.textContent = `${dayVal}, ${month} ${dateFormatted}`;
  condition.textContent = data.day.condition.text;
  icon.innerHTML = getLegitIcon(data.day.condition.code, 1);
  hiTempDesc.textContent = 'High';
  hiTemp.textContent = `${data.day.maxtemp_f} °F`;
  loTempDesc.textContent = 'Low';
  loTemp.textContent = `${data.day.mintemp_f} °F`;
  precipDesc.textContent = 'Rain';
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

function getDOW(date) {
  console.log(date);
  let day;
  switch (getDay(date)) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    default:
      day = 'Saturday';
  }
  return day;
}

function getMonthName(date) {
  let month;
  switch (getMonth(date)) {
    case 1:
      month = 'January';
      break;
    case 2:
      month = 'February';
      break;
    case 3:
      month = 'March';
      break;
    case 4:
      month = 'April';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'June';
      break;
    case 7:
      month = 'July';
      break;
    case 8:
      month = 'August';
      break;
    case 9:
      month = 'September';
      break;
    case 10:
      month = 'October';
      break;
    case 11:
      month = 'November';
      break;
    default:
      month = 'December';
  }
  return month;
}

function getDateFormat(date) {
  let day = getDate(date).toString();
  const lastChar = day.charAt(day.length - 1);
  switch (lastChar) {
    case '1':
      day += 'st';
      break;
    case '2':
      day += 'nd';
      break;
    case '3':
      day += 'rd';
      break;
    default:
      day += 'th';
  }
  return day;
}

function setBgColor(isDay) {
  const body = document.querySelector('body');
  const today = document.querySelector('.todays-weather');
  const search = document.querySelector('.search');
  const forecast = document.querySelector('.forecast');
  if (isDay) {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      today.classList.remove('dark-sub');
      search.classList.remove('dark-sub');
    }
    body.classList.add('light');
    today.classList.add('light-sub');
    search.classList.add('light-sub');
    forecast.classList.add('light-sub');
  } else {
    if (body.classList.contains('light')) {
      body.classList.remove('light');
      today.classList.remove('light-sub');
      search.classList.remove('light-sub');
    }
    body.classList.add('dark');
    today.classList.add('dark-sub');
    search.classList.add('dark-sub');
    forecast.classList.add('dark-sub');
  }
}

function toggleLoader() {
  const loader = document.querySelector('.loader-container');
  loader.classList.toggle('hidden');
}

function buildPage(weatherObj) {
  buildLocation(weatherObj.location, weatherObj.current);
  buildCurrent(weatherObj.current, weatherObj.forecast);
  buildDaily(weatherObj.forecast);
  buildForecast(weatherObj.forecast);
  setBgColor(weatherObj.current.is_day);
  toggleLoader();
}

export { buildPage, toggleLoader };
