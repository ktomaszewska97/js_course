const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast();

console.log(forecast);

const updateUI = (data) => {

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // properties desctructuring
    const { cityDetails, weather } = data;

    // overriding the same template
    details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `;

    // weather icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    // swapping icons day and night
    let imgSrc = null;
    if (weather.IsDayTime) {
        imgSrc = 'img/day.svg';
    } else {
        imgSrc = 'img/night.svg';
    }
    time.setAttribute('src', imgSrc);

    // removing the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

// const updateCity = async (city) => {

//     const cityDetails = await getCity(city);
//     const weather = await getWeather(cityDetails.Key)

//     return {
//         // Object shorthand notation
//         // when the property name is the same as value name
//         cityDetails,
//         weather
//         // cityDetails: cityDetails,
//         // weather: weather
//     };

// }; 

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    // get value from the form
    const city = cityForm.city.value.trim();

    cityForm.reset();

    // update the UI with a new city
    // returns a Promise so we can attach then and catch
    forecast.updateCity(city)
        .then( data => updateUI(data))
        .catch( err => console.log(err));

    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}