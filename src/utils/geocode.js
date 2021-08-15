const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVodWwyNTMiLCJhIjoiY2tycml1cXZtMHhpeDJ2cGZiYTl2ZTVwbiJ9.dEDenhV4st_LIzbbJq1mFQ&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined) //callback mei hee return kr rhe direct print se zyaada flexible hai ye
        }
        else if (body.features.length === 0) {
            callback('Unable to find location,try Another Search', undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

}
module.exports=geocode
