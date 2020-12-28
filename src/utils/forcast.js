const request = require('request');



const forcast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0f14661e4a320809b707e8e3e86ab2e1&query=${latitude},${longitude}`

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback(erorr,  undefined)
        } else if (body.error){
            callback('Please specify a valid location identifier',undefined)
        } else{
            callback(undefined, ` ${body.current.weather_descriptions[0]} It's is current ${body.current.temperature} out. it feels like ${body.current.feelslike}, the visibility ${body.current.visibility}`)
        }
    })
}

module.exports = forcast