const request = require('request')

const geocode = (address, callback) => {
    const urlMapBox = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FqamFkMTExIiwiYSI6ImNrcGNwMmVqdzAxMDMyd252d2NqaW04d24ifQ.fB5SEXv18tWfeEahbKWGpQ&limit=1'
    request({url: urlMapBox, json:true}, (error, {body}) => {
            if (error) {
             //console.log('unable to connnect to Mapbox')
             callback('Unable to connect to location services', undefined)
            }else if (body.features.length === 0){
             callback('Unable to find location. Please try another search', undefined)
            }else{
                    callback(undefined, {    

                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                    })
             }
    })
}

module.exports = geocode