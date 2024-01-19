const ejsMate = require('ejs-mate');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


// models
const Place = require('./models/place');

// connect mongo
mongoose.connect('mongodb://127.0.0.1/denpiw')
    .then((result) => {
        console.log('connected successfully');
    }).catch((err) => {
        console.log(err);
    });

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// miiddleware
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/places', async (req, res) => {
    const places = await Place.find();
    res.render('places/index',{places});
    console.log(places);

});


app.get('/places/create',(req, res) => {
    res.render('places/create');
})

app.post('/places',async (req, res) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect('/places')


});

app.get('/places/:id', async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/show',{place});
});

app.get('/places/:id/edit', async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit',{place});
});

app.put('/places/:id', async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, {...req.body.place});
    res.redirect('/places');
})

app.delete('/places/:id', async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places');
})




app.listen(2003,()=> {
    console.log(`server is running on http://127.0.0.1:2003`);
})