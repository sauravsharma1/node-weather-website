const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=e817c1cfbc59e8d805b2b72e3433bf41&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
callback('unable to connect with wather service',undefined)
        }
        else if(body.error){
                callback('unable to find location',undefined)
        }
        else{
                callback(undefined,body.current.weather_descriptions[0]+'.it is currently '+body.current.temperature+' degrees out.It feels like '+body.current.feelslike+' degrees out')
        }
    })
}

module.exports=forecast