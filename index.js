import { createBerufeliste, initBerufeEventListeners } from './scripts/berufe.js';
import { initClock } from './scripts/clock.js';
import { createHolidayWidget } from './scripts/holidays.js';
import { createTagesschauWidget } from './scripts/tagesschau.js';
import { createWeatherWidget } from './scripts/weather.js';

const init = async () => {
    const tagesschauContainer = document.getElementById('widgets');
    tagesschauContainer.appendChild(await createTagesschauWidget())

    const berufeContainer = document.getElementById('widget-berufe__berufliste');
    berufeContainer.appendChild(await createBerufeliste())
    initBerufeEventListeners()

    initClock()

    const weatherContainer = document.getElementById('widget-weather__content');
    weatherContainer.appendChild(await createWeatherWidget())

    const holidayContainer = document.getElementById('widget-holidays__content');
    holidayContainer.appendChild(await createHolidayWidget())
}


init().then(() => {
});
