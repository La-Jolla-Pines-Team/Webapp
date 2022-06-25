//fetch weather JSON
var weatherData = document.getElementById("fetchInfo").getAttribute("weatherJSON");
var weatherJSON = JSON.parse(weatherData);

//declaration of variables
const ACTIVITY = {
    blog_time: undefined,
}

function postBlog() {
    var today= new Date().toLocaleString();
    console.log(today);
    console.log(weatherJSON['weather'][0]['icon']);
    console.log(description);
    console.log(temperature);
}