'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getPinball = require('./pinball.js');
const getRestaurants = require('./restaurants.js');

const { postFavorite, getFavorites, deleteFavorite } = require('./favorites.js');

const postUser = require('./manageUsers.js');
const addOrRemoveFavorite = require('./favorites.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('mongoose is connected');
});

app.get('/pinball', getPinball);
app.get('/restaurants', getRestaurants);

app.get('/favorites', getFavorites);
app.post('/favorites', postFavorite);
app.delete('/favorites', deleteFavorite)

app.get('/test', (request, response) => {
  response.status(200).send('test request received');
});
app.post('/user', postUser);


app.get('*', (request, response) => {
  response.status(404).send('this is not what you were looking for');
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
