const path = require('path')
const express = require("express")
const hbs = require('hbs')
const { Http2ServerRequest } = require('http2')
const { query } = require('express')
const geocode = require('./utils/gecode')
const forcast = require('./utils/forcast')

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set hadlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDirectoryPath))


app.get('' , (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'sultan'
    })
})

app.get('/about' , (req, res) => {
    res.render('about',{
        title: 'about page',
        name: 'sultan'
    })
})

app.get('/help' , (req, res) => {
    res.render('help',{
        title: 'help page',
        name: 'sultan'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'you must Writing'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {

        if(error){
            return res.send({
                error:error
            })
        }

        forcast(latitude, longitude, (error,forcastdata)=>{
            if(error){
                return res.send({
                    error:error
                })
            }

            res.send({
                forcast:forcastdata,
                location: placeName,
                address : req.query.address
            })
        })
    })


})

app.get('/products', (req, res) =>{

    if (!req.query.rate) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.rate)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:404,
        name:'sultan',
        error:'not found help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:404,
        name:'sultan',
        error:'not found'
    })
})

app.listen(3000, ()=>{
    console.log('listening in port 3000')
})