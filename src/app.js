const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
//defines path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
res.render('index', {
    title: 'Weather',
    name: 'Sajjad'
})
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sajjad'
 })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'This page is a help guide',
        name: 'Sajjad'
 })
})


app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: "You must provide a address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error){
                return res.send({ error })
            }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){ 
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'Partly cloudy',
    //     location: 'Prayagraj',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term."
        })

    }
    res.send({products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help',
        name: 'Sajjad',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Sajjad',
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})