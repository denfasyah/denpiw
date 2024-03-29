const ejsMate = require('ejs-mate');
const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const wrapAsync = require('./utils/wrapAsync');   
const path = require('path');
const app = express();


// models
const Place = require('./models/place');

// connect mongo
mongoose.connect('mongodb://127.0.0.1/denpiw')
    .then(() => {
        console.log('connected db successfully');
    }).catch((err) => {
        console.log(err);
    });

// engine
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// miiddleware
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')));

// route
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/places', wrapAsync (async (req, res) => {
    const places = await Place.find();
    res.render('places/index',{places});

}));


app.get('/places/create',(req, res) => {
    res.render('places/create');
})

app.post('/places', wrapAsync (async (req, res,next) => {
  
        const place = new Place(req.body.place);
        await place.save();
        res.redirect('/places')
        


}));

app.get('/places/:id', wrapAsync (async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/show',{place});
}));

app.get('/places/:id/edit', wrapAsync (async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit',{place});
}));

app.put('/places/:id', wrapAsync (async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, {...req.body.place});
    res.redirect('/places');
}))

app.delete('/places/:id', wrapAsync (async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places');
}))

app.all('*', (req, res,next) => {
    next(new ErrorHandler)
})

app.use((err,req,res,next) => {
    const { statusCode = 500 } = err;
    if(!err.message || statusCode) err.message ='Oh no! Something went wrong'
    res.status(statusCode).render('error', {err});
})




app.listen(2003,()=> {
    console.log(`server is running on http://127.0.0.1:2003`);
})