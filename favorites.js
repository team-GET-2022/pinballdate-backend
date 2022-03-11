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
    console.log(dbUser.favoriteLocations);
    response.send(dbUser.favoriteLocations);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

//POST: Adds a new favorite to a given user's favorites array
async function postFavorite(request, response, next) {
  let email = request.body.email;
  let dbLocation = request.body.locationId;
  try {
    await User.findOneAndUpdate({
      email: email
    }, {
      $push: {
        favoriteLocations: dbLocation
      }
    }
    )
    response.status(200).send("Added favorite");
  } catch(error) {
    next(error);
  }
}

async function putFavorite(request, response, next) {
  let userEmail = request.body.email;
  let dbLocation = request.body.id;
  let note = request.body.note
  try {
    let results = await User.find({ email: userEmail });
    results[0].favoriteLocations.forEach((location, index) => {
      if(location.id === dbLocation) {
        results[0].favoriteLocations[index].note = note 
      }
    }
    )
    let updatedResults = await User.findByIdAndUpdate(results[0]._id, results[0], {overwrite: true, new: true})
    // await User.updateOne(
    //   filter: {
    //     email: userEmail,
    //     favoriteLocations[id]: dbLocation
    //   }, {
    //    $update: { "favoriteLocations.$.note": note}
    //   }

    //   );
    response.status(200).send(updatedResults);
  } catch (error) {
    next(error);
  }
}

//DELETE:  Removes favorite from array of favorites
async function deleteFavorite(request, response, next) {
  let userEmail = request.query.email;
  let dbLocation = request.query.locationId;
  try {

    await User.updateOne(
      {
        email: userEmail
      }, {
      $pull: { 'favoriteLocations': { id: dbLocation } }
    });
    response.status(204).send("deleted favorite");
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

// [
//   {
//     "name": "Bard's Tavern",
//     "id": "66666",
//     "comment": "This place rules!"
//   },
//   {
//     "name": "Comet Place",
//     "id": "12345",
//     "comment": "This place is okay!"
//   },
//   {
//     "name": "Raxx",
//     "id": "7777",
//     "comment": "This place is a hole in the wall!"
//   }
// ]

module.exports = { postFavorite, getFavorites, putFavorite, deleteFavorite };
