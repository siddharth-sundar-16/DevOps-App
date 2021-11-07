const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'  + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lkZHUtc3VuZGFyIiwiYSI6ImNrbnZwaW01MDBvdXIycG1rZzYyYmJ3eDgifQ.yxaqRBUUDOdgcwZpFz7Qqw&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to network services !', undefined)
        } else if (!(body.features && body.features.length)) {
            callback('Provide search query correctly !', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
    })

 }

 module.exports = geocode
 