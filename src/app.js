const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode.js')
const forecast = require('./forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Defining paths for Express configuration

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath)) // use() method is used to load middleware functions 

//Using handlebars and renaming views folder using set() 

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//using get method below

app.get('', (req, res) => {

    res.render('index', {

        title: 'Weather App',
        name: 'Siddharth Sundar'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About the weather app',
        desc: 'Helps you get to know the weather app',
        name: 'Siddharth Sundar'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {

        title: 'Welcome to the help page',
        intro: 'For doubts and clarifications, visit this page !',
        name: 'Siddharth Sundar'
    })
})

app.get('/weather', (req, res) => {

    var specialFormat = /^[^a-zA-Z0-9]+$/;

    if(!req.query.address || specialFormat.test(req.query.address) === true ) {

        return res.send({

            error: 'Please provide an address  !'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, place_name} = {} )  => {

        if(error) {
            
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, {temperature, feels_like_temp} = {}) => {

            if(error) {
                return res.send({ error })
            }

            res.send({

                location: place_name,
                temperature: temperature,
                feels_like: feels_like_temp
            })
        })

    })

})

app.get('*', (req, res) => {

    res.render('404', {

        title: '404 Error Page Not Found !',
        name: 'Siddharth Sundar'
    })
})

app.listen(port, () => {

    console.log('Server set up successfully in port ' + port + ' !')
})