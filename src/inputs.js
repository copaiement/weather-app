import { updatePage } from './apiFunctions';

function initializeInputs() {
  const submitBtn = document.querySelector('#submit-loc');
  submitBtn.addEventListener('click', getLoc);
}

function getLoc() {
  const input = document.querySelector('#loc');
  if (validateLocInput(input)) {
    updatePage(input.value);
  }
}

function validateLocInput(input) {
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

export { getLoc, initializeInputs };
