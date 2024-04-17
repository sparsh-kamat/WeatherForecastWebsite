import '../scss/main.scss';
import  { getCurrentWeather, getForecastWeather, searchLocation } from './api.js';

//DOM 
//DOM Helper functions
function createElementWithClass(elementType, className) {
    var element = document.createElement(elementType);
  
    if (Array.isArray(className)) {
        className.forEach(function (name) {
            element.classList.add(name);
        });
    } else {
        element.classList.add(className);
    }
  
    return element;
  }
  
  function createElementWithText(elementType, className, text) {
    var element = createElementWithClass(elementType, className);
    element.textContent = text;
    return element;
  }
  
  function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
  }
  
  export { setAttributes, createElementWithClass, createElementWithText };
  

//get location from input
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const current = document.querySelector('.current');
const cardcontainer = document. querySelector('.card-container');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
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
            cardcontainer.appendChild(createforecastcards(data)[i-1]);
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
    cardTitle.textContent = data.location.name + ', ' + data.location.country;
    const cardText = createElementWithClass('p', 'card-text');
    cardText.textContent = data.current.condition.text;
    // image 
    const imgwithcondition = createElementWithClass('div', 'imgwithcondition');

    const img = createElementWithClass('img', 'card-img-top');
    img.src = data.current.condition.icon;
    img.alt = data.current.condition.text;
    
    const cardTemp = createElementWithClass('p', 'card-text');
    cardTemp.textContent = Math.round(data.current.temp_c) + '°c';
    //give it an id 
    cardTemp.id = 'temp';

    // getday and time
    
    const date = new Date();
    const dayofweek = createElementWithClass('p', 'day');
    const day = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const time = createElementWithClass('p', 'time');
    const hours = date.getHours();
    const minutes = date.getMinutes();
    dayofweek.textContent = days[day]+ ', ' + hours + ':' + minutes + ' '+ (hours >= 12 ? 'PM' : 'AM');
    

    
    const cardHumidity = createElementWithClass('p', 'card-text');
    cardHumidity.textContent = 'Humidity: ' + data.current.humidity + '%';
    const cardWind = createElementWithClass('p', 'card-text');
    cardWind.textContent = 'Wind: ' + data.current.wind_kph + ' mph';

    const belowtitle = createElementWithClass('div', 'belowtitle');
    const textandimg = createElementWithClass('div', 'textandimg');
    const text = createElementWithClass('div', 'text');

    text.appendChild(cardText);

    imgwithcondition.appendChild(img);
    imgwithcondition.appendChild(text);
   textandimg.appendChild(cardTemp);
    textandimg.appendChild(imgwithcondition);

    belowtitle.appendChild(textandimg);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(belowtitle);
    belowtitle.appendChild(dayofweek);

    belowtitle.appendChild(cardHumidity);
    belowtitle.appendChild(cardWind);

    
    card.appendChild(cardBody);
    return card;
}


function createforecastcards(data){
    // create card array for 3 days
    const cards = [];
    for (let i = 1; i < 4; i++) {
        const card = createElementWithClass('div', 'card');
        const cardBody = createElementWithClass('div', 'card-body');
        const cardTitle = createElementWithClass('h5', 'card-title');
        cardTitle.textContent = data.forecast.forecastday[i].date;
        const cardText = createElementWithClass('p', 'card-text');
        cardText.textContent = data.forecast.forecastday[i].day.condition.text;
        // image
        const img = createElementWithClass('img', 'card-img-top');
        img.src = data.forecast.forecastday[i].day.condition.icon;
        img.alt = data.forecast.forecastday[i].day.condition.text;
        const cardTemp = createElementWithClass('p', 'card-text');
        //get it for celcius as well
        let temp_f = data.forecast.forecastday[i].day.maxtemp_f;
        let temp_c = data.forecast.forecastday[i].day.maxtemp_c;

        //round it to 0 decimal
        temp_f = Math.round(temp_f);
        temp_c = Math.round(temp_c);
        cardTemp.textContent = 'High: ' + temp_c + '°C';
        const cardLow = createElementWithClass('p', 'card-text');
        cardLow.textContent = 'Low: ' + data.forecast.forecastday[i].day.mintemp_f + '°F';
        const cardHumidity = createElementWithClass('p', 'card-text');
        cardHumidity.textContent = 'Humidity: ' + data.forecast.forecastday[i].day.avghumidity + '%';
        const cardWind = createElementWithClass('p', 'card-text');
        cardWind.textContent = 'Wind: ' + data.forecast.forecastday[i].day.maxwind_mph + ' mph';
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(img);
        cardBody.appendChild(cardTemp);
        cardBody.appendChild(cardLow);
        cardBody.appendChild(cardHumidity);

        cardBody.appendChild(cardWind);
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
        cardcontainer.appendChild(createforecastcards(data)[i-1]);
    }

});

