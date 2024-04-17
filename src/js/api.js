let apikey = "3e963439a3784995894134541241104";

let baseURL = "https://api.weatherapi.com/v1";
let currentWeather = "/current.json";
let forecastWeather = "/forecast.json";
let search = "/search.json";

async function getCurrentWeather(location = "auto:ip") {
    const response = await fetch(`${baseURL}${currentWeather}?key=${apikey}&q=${location}`);
    const data = await response.json();
    return data;
}

async function getForecastWeather(location = "auto:ip") {
    const response = await fetch(`${baseURL}${forecastWeather}?key=${apikey}&q=${location}&days=4`);
    const data = await response.json();
    return data;
}

async function searchLocation(query= "auto:ip") {
    const response = await fetch(`${baseURL}${search}?key=${apikey}&q=${query}`);
    const data = await response.json();
    return data;
}

export { getCurrentWeather, getForecastWeather, searchLocation };
