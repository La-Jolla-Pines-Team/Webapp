//fetch weather JSON
var weatherData = document.getElementById("fetchInfo").getAttribute( "weatherJSON" );
var weatherJSON = JSON.parse(weatherData);

//Initilize local variables with weatherJSON
var region = weatherJSON['name'];
console.log(region);
var icon = weatherJSON['weather'][0]['icon'];
console.log(icon);
var description = weatherJSON['weather'][0]['description'];
console.log(description);
var temperature = weatherJSON['main']['temp'];
console.log(temperature);

