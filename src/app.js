const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// define path for express config
const publicdirectorypath = path.join(__dirname, '../public')
const viewsdir = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


// template engine
app.set('view engine', 'hbs')
app.set('views', viewsdir)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirectorypath)) 

app.get('', (req, res) =>{
    res.render('index',{ 
        title: 'weather',
        name: 'ifeanyi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'ifeanyi'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'help page',
        name: 'ifeanyi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('you have to input a location')
    }
    forecast(req.query.address, (error, {temp, pressure, humidity}={}) => {
        if (error){
            return res.send({error})
        }
        res.send({
            temperature: temp,
            pressure: pressure,
            humidity: humidity,
            location: req.query.address
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        title: 'help article not found',
        name: 'ifeanyi'
    })
})

app.get('*', (req, res) => {
    res.render('errorpage', {
        title: 'file not found',
        name: 'ifeanyi'
    })
})

app.listen('3000', () => {
    console.log('server is up and running on port 3000')
})