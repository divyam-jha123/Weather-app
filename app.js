let MAIN_URL =
  "https://api.openweathermap.org/data/2.5/weather?&appid=98e0d8f6461b1a2be41c1c16337eb0a0&units=metric";

let input = document.querySelector(".search input");
let btn = document.querySelector(".search button");
let windEle = document.querySelector(".wind-data");
let humidityEle = document.querySelector(".hum-data");

const windData = (data) => {
  let windSpeed = data.wind.speed;
  let windSpeedData = windEle.firstElementChild;
  windSpeedData.textContent = `${windSpeed}km/h`;
};

const humidityData = (data) => {
  let humidity = data.main.humidity;
  let humData = humidityEle.firstElementChild;
  humData.textContent = `${humidity}%`;
};

const checkWeather = async (city) => {
  let response = await fetch(MAIN_URL + `&q=${city}`);
  let data = await response.json();
  // changing the temp
  const temp = data.main.temp;
  let tempData = document.querySelector(".temp-data span");
  tempData.innerText = temp;

  windData(data); // changing the wind data;
  humidityData(data); // changing the humidity data;
};

const imageChange = (data) => {
  let weatherImg = document.querySelector(".img img");
    let weatherCondition = data.weather[0].main;
    if (!weatherImg || !weatherCondition) return;

  let lowercaseWeatherCondition =
      weatherCondition.charAt(0).toLowerCase() + weatherCondition.slice(1);
    
    console.log(lowercaseWeatherCondition);
    
   weatherImg.src = `./images/${lowercaseWeatherCondition}.png`;

};

async function showingWeather(e) {
  let val = input.value;
  let response = await fetch(MAIN_URL + `&q=${val}`);
  let data = await response.json();
  checkWeather(val);
  if (val) {
    let city = document.querySelector(".city-name");
    city.innerText = data.name;
  } else {
    location.reload();
  }

  imageChange(data);
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    showingWeather(e);
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("key has been pressed");
        showingWeather();
    }
});
