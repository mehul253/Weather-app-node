const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=216ad4340668b59bc231f854e0a180ef&query='+latitude+','+longitude
    request({ url, json: true }, ( error, {body} )=> {    //url:url bhi likh skte
    if (error) {
        callback('Unable to connect to weather sevice', undefined)

    } else if (body.error)
     {
        callback('Unable to find location', undefined)

    } else 
    {
        callback(undefined, 'It is currently ' + body.current.temperature + ' but it feels like ' + body.current.feelslike)

    }
})
}
module.exports = forecast