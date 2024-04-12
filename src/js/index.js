import '../scss/main.scss';
import  { getCurrentWeather, getForecastWeather, searchLocation } from './api.js';



//get location from input
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const content = document.querySelector()

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value;
    getCurrentWeather(query).then(data => {
        console.log(data);
    }
    );
    getForecastWeather(query).then(data => {
        console.log(data);
    }
    );
}
);










//start with current location
getForecastWeather().then(data => {
    console.log(data);
});