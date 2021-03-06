const request = require('request')

const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8e6f0851a1ee43dfcf51e2c12e063555&query=' +latitude+ ','+longitude+ '&units=f'
request({url, json: true} , (error, {body}) => {
    if (error) {
        //console.log('unable to connnect to Mapbox')
        callback('Unable to connect to weather services', undefined)
       }else if (body.error){
        callback(body.error, undefined)
       }else{
               callback(undefined, 'The weather is ' + body.current.weather_descriptions[0] + ' and temperature is ' + body.current.temperature + ' with a humidity ' + body.current.humidity + '%')
        }
})

}

module.exports = forecast