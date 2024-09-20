// Váriaveis e Seleção de Elementos

const apiKey = '3d84088d030661ace08a2f3700af2b42';
const apiCountryUrl = 'https://flagsapi.com/';


const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const hideElement = document.querySelector(".hide");

// Funções

const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res = await fetch(apiWeatherURL);
    const data = res.json();

    // console.log(data);
    return data;
}


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryUrl + data.sys.country + "/flat/64.png");
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    hideElement.classList.remove('hide');
}

// Eventos

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    const data = getWeatherData(city);

    if (city !== data.name || city == "") {
        console.log('Digite o nome de uma cidade existente!');
    }


    showWeatherData(city);
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        
        e.preventDefault();

        const city = cityInput.value;

        const data = getWeatherData(city);

        if (city !== data.name || city == "") {
            console.log('Digite o nome de uma cidade existente!');
        }
    
        showWeatherData(city);
    }
})
