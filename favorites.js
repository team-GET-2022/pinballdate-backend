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
  let user = request.body.email;
  let dbLocation = request.body.locationId;
  console.log("This is the user email", user);
  console.log("This is the dbLocation", dbLocation);
  try {
      await User.findOneAndUpdate({
        email: user
      }, {
        $push: {
          favoriteLocations: dbLocation
        }
      }
      )
    response.status(200).send("Added favorite");

  } catch {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

//DELETE:  Removes favorite from array of favorites
async function deleteFavorite(request, response, next) {
  let user = request.query.email;
  let dbLocation = request.query.locationId;

    await User.findOneAndUpdate({
      email: user
    }, {
      $pull: {
        favoriteLocations: dbLocation
      }
    }
    )

  response.status(204).send("deleted favorite");
}

module.exports = { postFavorite, getFavorites, deleteFavorite };
