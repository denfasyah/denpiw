const express = require('express');
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/places', async (req, res) => {
    const places = await Place.find();
    res.render('places/index',{places});
    console.log(places);

});


app.get('/places/:id', async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/show',{place});
})



// app.get('/seed/place', async (req, res) => {
//     const place = new Place({
//         title: 'Empire State Building',
//         price : '$999',
//         description: 'A great building',
//         location: 'New York, NY',
//     })
//     await place.save();
//     res.send(place);


// })


app.listen(2003,()=> {
    console.log(`server is running on http://127.0.0.1:2003`);
})