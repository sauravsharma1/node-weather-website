const request=require('request')

const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2F1cmF2c2hhcm1hIiwiYSI6ImNrbzEwdWcxeDBrdncyd29ieGp1NHVkamIifQ.4yeiUXr1bTffyzuS8Jya7w&limit=1'

request({url:url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to location services',undefined)
    }
    else if(body.features.length===0){
        callback('unable to find location,try another search',undefined)

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