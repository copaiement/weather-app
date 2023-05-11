import { updatePage } from './apiFunctions';

function initializeInputs() {
  const submitBtn = document.querySelector('#submit-loc');
  submitBtn.addEventListener('click', getLoc);
  const currentDaily = document.querySelector('.current-daily');
  currentDaily.addEventListener('click', toggleDaily);
}

function getLoc() {
  const input = document.querySelector('#loc');
  if (validateLocInput(input)) {
    updatePage(input.value);
  }
}

function validateLocInput(input) {
  const regexCity = /^[a-z\s,]{2,}$/gi;
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

function toggleDaily() {
  const daily = document.querySelector('.today-daily');
  const current = document.querySelector('.today-current');
  const btn = document.querySelector('.current-daily');
  if (daily.classList.contains('hidden')) {
    daily.classList.remove('hidden');
    current.classList.add('hidden');
    btn.textContent = 'Show Current Weather';
  } else {
    daily.classList.add('hidden');
    current.classList.remove('hidden');
    btn.textContent = 'Show Today\'s Forecast';
  }
}

export { getLoc, initializeInputs, toggleDaily };
