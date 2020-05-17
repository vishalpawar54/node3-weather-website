const request = require('request');

const forecast = (lat, long, forecastCallback) => {
    const url = 'http://api.weatherstack.com/current?access_key=21efa661b12de8e2dd992093c6370ff9&query='+lat+','+long; 
    request({url: url, json: true}, (err, response) => {
        if(err) {
                forecastCallback('Unable to connect to the location service..', undefined);
                } else if(response.body.error) {
                    forecastCallback('Unable to locate search. Try another one..', undefined);
                } else {                    
                    // const data = response.body && JSON.parse(response.body.current);
                    forecastCallback(undefined, response.body.current);
                }
    })
};

module.exports = forecast;