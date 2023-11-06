const fetchWeather= async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.51425355069284&longitude=7.459219343910543&current=temperature_2m,windspeed_10m,precipitation_probability,precipitation', {

    });
    return await response.json();
}

export const createWeatherWidget = async () => {
    const weather = await fetchWeather();
    const weatherWidget = document.createElement('div');
    weatherWidget.classList.add('widget-weather__content__values');
    weatherWidget.innerHTML = `
        <div class="weather-widget__temperature">${ weather.current.temperature_2m } °C</div>
        <div class="weather-widget__wind">${ weather.current.windspeed_10m } km/h</div>
        <div class="weather-widget__precipitation">${ weather.current.precipitation_probability } % / ${ weather.current.precipitation } mm</div>
    `;
    return weatherWidget;
}
