/**
 * Express router
 */
const express = require('express');
const router = express.Router();

/**
 * Openweather-api
 */
var weather = require('openweather-apis');
weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID('fd79ef0946c9fee5b88185ffba7261aa');
//weather.setCity('La Jolla');
weather.setCoordinate(32.8328, 117.2713);
weather.setZipCode(92122);

router.get('/webapp/weatherblog/test', (req, res) => {
    weather.getAllWeather(function(err, weatherJSON){
        res.render('weatherblog.ejs', {weatherJSON : weatherJSON});
    });
})

module.exports = router;