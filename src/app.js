const path = require('path')
const express = require("express");
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

// DEfine Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public' )
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars(hbs) and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


///////////////////
///// ROUTES /////
/////////////////

app.get("/", (req, res) => {
    res.render("index", {
        title : 'Weather App',
        name : 'Anmol'
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title : 'About me',
        name : 'Anmol'
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText : 'This is Helpful Text',
        title : 'Help'
    })
})

app.get("/weather", (req, res) => {

    if(!req.query.address){
        return res.send({
            error : "Plz put an address"
        })
    }
    
    geocode(req.query.address,(error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        
        })
    })


})

app.get("/help/*", (req, res) => {
    res.render("404",{
        errorMsg : 'Help article not found',
        title : '404'
    })
})

app.get("*", (req, res) => {
    res.render("404",{
        errorMsg : 'Page not found',
        title : '404'
    })
})


app.listen(3000, () =>{
    console.log('Server Is Up On port 3000!!!')
})