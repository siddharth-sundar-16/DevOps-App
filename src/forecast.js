const request = require('request')

const forecast = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=9fcc32b1f3fad376c649662a6f8d0423&query=' + latitude  + ',' + longitude + '&units=s'

    request({url, json: true},(error, {body} = {}) => {
        if(error) {
            callback('Poor network connectivity! Please try again !', undefined)
        } else if(body.error) {
            callback('Provide a proper search query!', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feels_like_temp:body.current.feelslike
            })
        }
    })
 }

 module.exports = forecast