import '../scss/main.scss';
import { getCurrentWeather, getForecastWeather, searchLocation } from './api.js';
import { createElementWithClass } from './domhelper.js';



//get location from input
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const current = document.querySelector('.current');
const cardcontainer = document.querySelector('.card-container');
const toggle = document.querySelector('.toggle');
let tempunit = "c";
let location = 'auto:ip';

toggle.addEventListener('click', (e) => {
    if (tempunit === "c") {
        tempunit = "f";
    } else {
        tempunit = "c";
    }

    getCurrentWeather(location).then(data => {
        current.innerHTML = '';
        current.appendChild(createCurrentCard(data));
    }
    );

    getForecastWeather(location).then(data => {
        cardcontainer.innerHTML = '';
        for (let i = 1; i < 4; i++) {
            cardcontainer.appendChild(createforecastcards(data)[i - 1]);
        }
    }
    );

}
);

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    location = searchInput.value;
    const query = searchInput.value;

    getCurrentWeather(query).then(data => {
        console.log(data);
        current.innerHTML = '';
        current.appendChild(createCurrentCard(data));
    }
    );
    getForecastWeather(query).then(data => {
        cardcontainer.innerHTML = '';
        for (let i = 1; i < 4; i++) {
            cardcontainer.appendChild(createforecastcards(data)[i - 1]);
        }

        console.log(data);
    }
    );
}
);


// function to make a card in current to show todays details with time, tem , humidity etc 

function createCurrentCard(data) {
    const card = createElementWithClass('div', 'card');
    const cardBody = createElementWithClass('div', 'card-body');
    const cardTitle = createElementWithClass('h5', 'card-title');
    const cardText = createElementWithClass('p', 'card-text');
    const imgwithcondition = createElementWithClass('div', 'imgwithcondition');
    const img = createElementWithClass('img', 'card-img-top');
    const cardTemp = createElementWithClass('p', 'card-text');
    const corf = createElementWithClass('p', 'temp-type');
    const date = new Date();
    const dayofweek = createElementWithClass('p', 'day');
    const day = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const time = createElementWithClass('p', 'time');
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const cardHumidity = createElementWithClass('p', 'card-text');
    const cardWind = createElementWithClass('p', 'card-text');
    const belowtitle = createElementWithClass('div', 'belowtitle');
    const textandimg = createElementWithClass('div', 'textandimg');
    const text = createElementWithClass('div', 'text');


    cardTitle.textContent = data.location.name + ', ' + data.location.country;
    cardText.textContent = data.current.condition.text;

    img.src = data.current.condition.icon;
    img.alt = data.current.condition.text;


    if (tempunit === "c") {
        cardTemp.textContent = Math.round(data.current.temp_c);
        corf.textContent = '°c';
    }
    else {
        cardTemp.textContent = Math.round(data.current.temp_f);
        corf.textContent = '°f';
    }

    cardTemp.appendChild(corf);
    cardTemp.id = 'temp';
    dayofweek.textContent = days[day] + ', ' + hours + ':' + minutes;
    cardHumidity.textContent = 'Humidity: ' + data.current.humidity + '%';
    cardWind.textContent = 'Wind: ' + data.current.wind_kph + ' mph';
    text.appendChild(cardText);
    imgwithcondition.appendChild(img);
    imgwithcondition.appendChild(text);
    textandimg.appendChild(cardTemp);
    textandimg.appendChild(imgwithcondition);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(belowtitle); 
    belowtitle.appendChild(textandimg);
    belowtitle.appendChild(dayofweek);
    belowtitle.appendChild(cardHumidity);
    belowtitle.appendChild(cardWind);
    card.appendChild(cardBody);
    return card;
}


function createforecastcards(data) {
    const cards = [];
    for (let i = 1; i < 4; i++) {
        const card = createElementWithClass('div', 'card');
        const cardBody = createElementWithClass('div', 'card-body');
        const cardTitle = createElementWithClass('h5', 'card-title');
        const date = new Date();
        const day = date.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const cardText = createElementWithClass('p', 'card-text');
        const imgwithcondition = createElementWithClass('div', 'imgwithcondition');
        const img = createElementWithClass('img', 'card-img-top');
        const cardTemp = createElementWithClass('p', 'card-text');
        const corf = createElementWithClass('p', 'temp-type');
        cardTemp.id = 'temp';
        const maxtemp = createElementWithClass('p', 'card-text');
        const mintemp = createElementWithClass('p', 'card-text');
        const cardHumidity = createElementWithClass('p', 'card-text');
        const cardWind = createElementWithClass('p', 'card-text');
        const belowtitle = createElementWithClass('div', 'belowtitle');
        const textandimg = createElementWithClass('div', 'textandimg');
        const text = createElementWithClass('div', 'text');


        cardTitle.textContent = days[(day + i) % 7];
        cardText.textContent = data.forecast.forecastday[i].day.condition.text;
        img.src = data.forecast.forecastday[i].day.condition.icon;
        img.alt = data.forecast.forecastday[i].day.condition.text;
        if (tempunit === "c") {
            cardTemp.textContent = Math.round(data.forecast.forecastday[i].day.avgtemp_c);
            corf.textContent = '°c';
            maxtemp.textContent = 'Max Temp: ' + data.forecast.forecastday[i].day.maxtemp_c + '°c';
            mintemp.textContent = 'Min Temp: ' + data.forecast.forecastday[i].day.mintemp_c + '°c';
        }
        else {
            cardTemp.textContent = Math.round(data.forecast.forecastday[i].day.avgtemp_f);
            corf.textContent = '°f';
            maxtemp.textContent = 'Max Temp: ' + data.forecast.forecastday[i].day.maxtemp_f + '°f';
            mintemp.textContent = 'Min Temp: ' + data.forecast.forecastday[i].day.mintemp_f + '°f';
        }
        cardTemp.appendChild(corf);
        cardHumidity.textContent = 'Humidity: ' + data.forecast.forecastday[i].day.avghumidity + '%';
        cardWind.textContent = 'Wind: ' + data.forecast.forecastday[i].day.maxwind_kph + ' mph';
        text.appendChild(cardText);
        imgwithcondition.appendChild(img);
        imgwithcondition.appendChild(text);
        textandimg.appendChild(cardTemp);
        textandimg.appendChild(imgwithcondition);
        belowtitle.appendChild(textandimg);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(belowtitle);
        belowtitle.appendChild(maxtemp);
        belowtitle.appendChild(mintemp);
        belowtitle.appendChild(cardHumidity);
        belowtitle.appendChild(cardWind);
        card.appendChild(cardBody);
        cards.push(card);
    }
    return cards;
}



// function to make a card in forecast to show 3 days details with time, tem , humidity etc
//call the api to get the current weather
getCurrentWeather().then(data => {
    current.appendChild(createCurrentCard(data));
    console.log(data);
});



//start with current location
getForecastWeather().then(data => {
    cardcontainer.innerHTML = '';
    for (let i = 1; i < 4; i++) {
        cardcontainer.appendChild(createforecastcards(data)[i - 1]);
    }

});

