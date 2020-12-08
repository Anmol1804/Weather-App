const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) +'&appid=2135fbc3d20b0598efde5c286175fd20&units=imperial';
    
    request( {url : url, json: true}, (error, response) => {
    if (error){
        callback('Unable To connect to weather service',  undefined);
    }else if(response.body.message){
        callback('Unable to find location', undefined);
    }else{
        callback(undefined, 'Current Temperature is ' + response.body.current.temp+' F');
    }
})
}

module.exports = forecast;
