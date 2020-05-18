const path = require('path');

const express = require('express');

const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
console.log(path.join(__dirname, '../view'));

const port = process.env.PORT || 3000;
 
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.use(
//     express.static(path.join(__dirname, '../public'))
// )


app.use(express.static(path.join(publicDirectoryPath)));
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Vishal Pawar',
    });
});


app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'HELP',
        name: 'Vishal Pawar'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'ABOUT',
        name: 'VISHAL PAWAR'
    });
});

app.get('/weather', (req, res) =>{
    if(req.query && req.query.addrexss !== 0) {
        console.log('req.query.address', req.query.address);
        geocode(req.query.address, (err, geocodeData) => {
            if (err) {
                res.send ({
                    error: err,
                });
            }
            forecast(geocodeData.latitude, geocodeData.longitude, (error, data) => {
                if (error) {
                    res.send ({
                        error,
                    });
                }
                else {
               res.send(
                    {
                        'location': geocodeData.placename,
                        'latitude': geocodeData.latitude,
                        'longitude': geocodeData.longitude,
                        'data': data.humidity
                    }
                );  
                }      
            })
        });
    //  return res.send(
    //      {
    //          'location': req.query.address,
    //          'weather': 'Cloudy',
    //          'address': req.query.address,
    //      }
    //  );
    } else {
        res.send({
            'error': 'Address is not provided',
        });
    }
 });

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        desc: 'Page not found',
    })
})


app.get('/about/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        desc: 'Page not found',
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port);
})