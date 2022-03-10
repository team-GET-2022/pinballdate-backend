'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
const { db } = require('./models/user.js');
const User = require('./models/user.js');

mongoose.connect(process.env.DATABASE_URL);


//GET: Sends the list of favorites back to the frontend: 
async function getFavorites(request, response, next) {
  try {
    let dbUser = await User.find({ email: request.query.email });
    console.log(dbUser[0].favoriteLocations);
    response.send(dbUser[0].favoriteLocations);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

//POST: Adds a new favorite to a given user's favorites array
async function postFavorite(request, response, next) {
  try {
    console.log("help");
    let dbUser = await User.find({ email: request.body.email });
    let dbLocation = request.body.locationId;
    console.log("Db user:", dbUser);

    dbUser[0].favoriteLocations.push(dbLocation);
    response.send(200).send(`Favorite location ${dbLocation} added`);

  } catch {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

//DELETE:  Removes favorite from array of favorites
async function deleteFavorite(request, response, next) {
  let dbUser = await User.find({ email: request.query.email });
  let dbLocation = request.query.locationId;

  console.log('Db location:', dbLocation);
  console.log('Favorite locations: ', dbUser[0].favoriteLocations);

  //Experiment: Can we make a local copy of the favorites, modify it, 
  // and replace the entire Mongo array with our newFavorites? 
  //Instead of trying to modify the array elements on mongo
  let newFavorites = dbUser[0].favoriteLocations;
  newFavorites.pull(dbLocation);
  console.log('New Favorites: ',newFavorites);

  let tempUserObject = dbUser;
  
  tempUserObject.favoriteLocations = newFavorites;

  console.log("Temp user object:", tempUserObject);

  User.findByIdAndUpdate(dbUser._id, tempUserObject);

  //What we feel like SHOULD work:
  // dbUser[0].favoriteLocations.remove(dbLocation);

  response.status(204).send("deleted favorite");
}

module.exports = { postFavorite, getFavorites, deleteFavorite };
