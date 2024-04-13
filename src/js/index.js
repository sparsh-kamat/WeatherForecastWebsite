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
const forecast = document. querySelector('.forecastthreeday');

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
    const img = createElementWithClass('img', 'card-img-top');
    img.src = data.current.condition.icon;
    img.alt = data.current.condition.text;
    
    const cardTemp = createElementWithClass('p', 'card-text');
    cardTemp.textContent = data.current.temp_f + '°F';
    const cardHumidity = createElementWithClass('p', 'card-text');
    cardHumidity.textContent = 'Humidity: ' + data.current.humidity + '%';
    const cardWind = createElementWithClass('p', 'card-text');
    cardWind.textContent = 'Wind: ' + data.current.wind_mph + ' mph';

    const belowtitle = createElementWithClass('div', 'belowtitle');
    const textandimg = createElementWithClass('div', 'textandimg');
    const text = createElementWithClass('div', 'text');

    text.appendChild(cardText);

   textandimg.appendChild(text);
    textandimg.appendChild(img);

    belowtitle.appendChild(textandimg);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(belowtitle);
    belowtitle.appendChild(cardTemp);
    belowtitle.appendChild(cardHumidity);
    belowtitle.appendChild(cardWind);

    
    card.appendChild(cardBody);
    return card;
}


function createforecastcards(data){
    // create card array for 3 days
    
}



// function to make a card in forecast to show 3 days details with time, tem , humidity etc
//call the api to get the current weather
getCurrentWeather().then(data => {
    current.appendChild(createCurrentCard(data));
    console.log(data);
});



//start with current location
getForecastWeather().then(data => {
    console.log(data);
});