const request = require('request')

const forecast = (address, callback) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address +'&appid=2f3d26e4e4f14e44e92b09f6cba714b3'
    
    request({url: url, json: true}, (error, response) => {
        console.log(response)
        if(error){
            callback('unable to connect to a weather service', undefined)
        }else if (response === 0){
            callback('unable to get weather of the specified loaction', undefined)
        }else{
            callback(undefined,  response.body.main)

        }
        
    })
}

module.exports = forecast