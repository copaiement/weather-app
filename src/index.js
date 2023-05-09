import './style.css';

import { updatePage } from './apiFunctions';
import { initializeInputs } from './inputs';

// weather API Key:
// 400f15b7cc534eb7850174113230505

// full request URL
// https://api.weatherapi.com/v1/current.json?key=400f15b7cc534eb7850174113230505&q=london

// modifiers:
// q=ZIP CODE
// q=auto:ip *Lookup location by IP

function initialize() {
  initializeInputs();
  updatePage('auto:ip');
}

initialize();
