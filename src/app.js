const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const publicDirectoryPath=path.join(__dirname,'../public')

const app=express()

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
const viewPath=path.join(__dirname,'/templates/views')
const partialsPath=path.join(__dirname,'/templates/partials')

app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Saurav Sharma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About it',
        name:'about',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Text For Help',
        title:'help',
        name:'Saurav'
    })
})

app.get('/weather',(req,res)=>{

if(!req.query.address){
    return res.send({
        error:'You must provide an address'
    })
}

geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }

        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })

    })
})

    // forecast(latitude,longitude,(error,forecastData)=>{
    //     if(error){
    //         return res.send({error})
    //     }

    //     res.send({
    //         forecast:forecastData,
    //         location,
    //         address:req.query.address
    //     })

    // })
    //  res.send({
    //     forecast:'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{

if(!req.query.search){
    return res.send({
        error:'You must provide a search term'
    })
}

    console.log(req.query.search)
    res.send({
        products:[],
    })

})

app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})

app.get('*',(req,res)=>{
res.send('My 404 page')
})

app.listen(3000,()=>{
    console.log('server is up on port 3000!')
})