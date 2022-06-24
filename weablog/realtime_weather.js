//declaration of variables
const WEATHER = {
    region: undefined,
    icon: undefined,
    description: undefined,
    temperature: undefined,
    sunrise: undefined,
    sunset: undefined
}

const TEMP_RANGE = {
    hot: 30,
    warm: 20,
    cold: 10,
    freezing: -5
}

const COLOR = {
    r: undefined,
    g: undefined,
    b: undefined
}

//fetch weather JSON
var weatherData = document.getElementById("fetchInfo").getAttribute("weatherJSON");
var weatherJSON = JSON.parse(weatherData);

//Initilize local variables with weatherJSON
WEATHER.region = weatherJSON['name'];
console.log(WEATHER.region);
WEATHER.icon = weatherJSON['weather'][0]['icon'];
console.log(WEATHER.icon);
WEATHER.description = weatherJSON['weather'][0]['description'];
console.log(WEATHER.description);
WEATHER.temperature = weatherJSON['main']['temp'];
console.log(WEATHER.temperature);
WEATHER.sunrise = weatherJSON['sys']['sunrise'];
console.log(WEATHER.sunrise);
WEATHER.sunset = weatherJSON['sys']['sunset'];
console.log(WEATHER.sunset);

//update sunrise & sunset time to webpage
var sunrise_time = new Date(WEATHER.sunrise * 1000);
document.getElementById("sunriseTime").innerText = "Sun rises at: " + sunrise_time.toLocaleTimeString();

var sunset_time = new Date(WEATHER.sunset * 1000);
document.getElementById("sunsetsTime").innerText = "Sun sets at: " + sunset_time.toLocaleTimeString();

//update weather data to webpage
document.getElementById("weatherIcon").src = "/weablog/weather_icons/" + WEATHER.icon + ".png";
document.getElementById("weatherDescription").innerText = WEATHER.description;
document.getElementById("temperature").innerText = WEATHER.temperature + "°C";

//change app theme with respect to temperature
temperatureTheme();

function temperatureTheme() {
    if (WEATHER.temperature > TEMP_RANGE.hot) {
        //when temperature is boiling
        COLOR.r = timeOfDayMultiplier(255, (WEATHER.icon).slice(-1));
        COLOR.g = timeOfDayMultiplier(17, (WEATHER.icon).slice(-1));
        COLOR.b = timeOfDayMultiplier(0, (WEATHER.icon).slice(-1));
        document.getElementById("tempIcon").src = "/weablog/temp_icons/hot.png";
    }
    else if (WEATHER.temperature > TEMP_RANGE.warm) {
        //when temperature is hot
        COLOR.r = timeOfDayMultiplier(255, (WEATHER.icon).slice(-1));
        COLOR.g = timeOfDayMultiplier(102, (WEATHER.icon).slice(-1));
        COLOR.b = timeOfDayMultiplier(0, (WEATHER.icon).slice(-1));
        document.getElementById("tempIcon").src = "/weablog/temp_icons/hot.png";
    }
    else if (WEATHER.temperature > TEMP_RANGE.cold) {
        //when temperature is warm
        COLOR.r = timeOfDayMultiplier(255, (WEATHER.icon).slice(-1));
        COLOR.g = timeOfDayMultiplier(196, (WEATHER.icon).slice(-1));
        COLOR.b = timeOfDayMultiplier(0, (WEATHER.icon).slice(-1));
        document.getElementById("tempIcon").src = "/weablog/temp_icons/warm.png";
    }
    else if (WEATHER.temperature > TEMP_RANGE.freezing) {
        //when temperature is cold
        COLOR.r = timeOfDayMultiplier(0, (WEATHER.icon).slice(-1));
        COLOR.g = timeOfDayMultiplier(171, (WEATHER.icon).slice(-1));
        COLOR.b = timeOfDayMultiplier(255, (WEATHER.icon).slice(-1));
        document.getElementById("tempIcon").src = "/weablog/temp_icons/warm.png";
    }
    else {
        //when temperature is freezing
        COLOR.r = timeOfDayMultiplier(0, (WEATHER.icon).slice(-1));
        COLOR.g = timeOfDayMultiplier(111, (WEATHER.icon).slice(-1));
        COLOR.b = timeOfDayMultiplier(255, (WEATHER.icon).slice(-1));
        document.getElementById("tempIcon").src = "/weablog/temp_icons/cold.png";
    }

    var temperature_color = rgbToHex(COLOR.r, COLOR.g, COLOR.b);

    document.body.style.backgroundColor = temperature_color;
    document.getElementById("postBlog").style.backgroundColor = temperature_color;
}

function timeOfDayMultiplier(num, timeOfDay) {
    if (timeOfDay == "n") {
        //when it is night time return the night-themed color
        return Math.floor(num * 0.6);
    }
    else {
        //when it is day time return the original num
        return num;
    }
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}