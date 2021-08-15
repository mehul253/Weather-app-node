const path = require('path')
const express = require('express')
const app = express()
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const { groupCollapsed } = require('console')
const { resolveSoa } = require('dns')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


//DEFINE PATHS FOR EXPRESS CONFIG
const directory = path.join(__dirname, '../public')
const viewspath=path.join(__dirname,'../templates/views') 
const partialspath=path.join(__dirname,'../templates/partials')  
//console.log(directory)

//SETUP HANDLEBARS AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views',viewspath) 
         
hbs.registerPartials(partialspath)
 //SETUP STATIC DIRECTORY TO SERVE                                     //set krne k liye kaunse folder se dynamic files lega 
app.use(express.static(directory))             //index by default chalti hai



// app.get('', (req, res) => {                     //first jagah pe aayega / k baad kya hoga home page k liye khaali chodha
//     res.send('<h1>Weather</h1>')                // can directly write html here or create a new html file and pass it here 

// })


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Mehul',
//         age: 20
//     }, {
//         name: 'Manan',                 // express.static doing it all
//         age: 15
//     }])
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather app',
        name:'Mehul Gulati'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:'Mehul Gulati'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help Page',
        name:'Mehul Gulati'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Provide Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })            //destructuring
    // res.send({
    //     forecast: 'Sunny',
    //     location: 'Lucknow',
    //     address:req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){            //if no search provided
        return res.send({
            error:'You must provide search term'     // we can only send one response to server so res.send can come only once return krde to vahi end hojaega
        })
    }
    console.log(req.query)             //req.query mei saari queries hoti
    res.send({
        products:[]
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mehul Gulati',
        errorMessage:'Help Article Not found'
    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mehul Gulati',
        errorMessage:'Page not Found'
    })
})               //* matlab jo defined nahi hai
app.listen(3000, () => {
    console.log('Server is up on port 3000')  // ye apne ko show hoga browser mei nahi
})