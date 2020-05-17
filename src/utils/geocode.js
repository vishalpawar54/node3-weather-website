const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmlzaGFscGF3YXI3NSIsImEiOiJja2E2am1raHMwN2thMnhsZTE0NG1qbnc1In0.NYBnBkFSkshLWH_R15YcNQ&limit=1';
    request({ url: geocodeURL, json: true}, (err, response) => {
        if(err) {
            callback('Unable to connect to the location service..', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to locate search. Try another one..', undefined);
        } else {
            const geoData = response.body.features[0];
            callback(undefined, {
                latitude: geoData.center[0],
                longitude: geoData.center[1],
                placename: geoData.place_name
            });
        }
    });
}

module.exports = geocode;