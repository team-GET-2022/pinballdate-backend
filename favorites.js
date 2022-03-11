'use strict';

const User = require('./models/user.js');


//GET: Sends the list of favorites back to the frontend: 
async function getFavorites(request, response, next) {
  try {
    let dbUser = await User.findOne({ email: request.query.email });
    response.send(dbUser.favoriteLocations);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

async function postFavorite(request, response, next) {
  try {
    // Find EXACT object to update and push into favoriteLocations
    let dataToUpdate = await User.findOne({ email: request.body.email });
    dataToUpdate.favoriteLocations.push(request.body.favoriteLocations);

    // Put object with updated data.
    let updatedData = await User.findByIdAndUpdate(dataToUpdate._id, dataToUpdate, { new: true, overwrite: true });
    response.send(updatedData);
  } catch (error) {
    next(error);
  }
}

async function putFavorite(request, response, next) {
  let userEmail = request.query.email;
  let dbLocation = request.body.id;
  let score = request.body.score;
  try {
    let results = await User.findOne({ email: userEmail });
    results.favoriteLocations.forEach((location, index) => {
      if (location.id === dbLocation) {
        results.favoriteLocations[index].score = score;
      }
    }
    );
    let updatedResults = await User.findByIdAndUpdate(results._id, results, { overwrite: true, new: true });
    response.status(200).send(updatedResults);
  } catch (error) {
    next(error);
  }
}

//DELETE:  Removes favorite from array of favorites
async function deleteFavorite(request, response, next) {
  let userEmail = request.query.email;
  let locationId = +request.query.locationId;
  try {
    let dataToUpdate = await User.findOne({ email: userEmail });
    let filteredLocations = dataToUpdate.favoriteLocations.filter(location => location.id !== locationId);
    dataToUpdate.favoriteLocations = filteredLocations;
    let updatedData = await User.findByIdAndUpdate(dataToUpdate._id, dataToUpdate, { new: true, overwrite: true });
    response.status(200).send(updatedData);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

module.exports = { postFavorite, getFavorites, putFavorite, deleteFavorite };
