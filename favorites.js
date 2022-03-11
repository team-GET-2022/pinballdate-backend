'use strict';

const User = require('./models/user.js');


//GET: Sends the list of favorites back to the frontend: 
async function getFavorites(request, response, next) {
  console.log(request.query.email);
  try {
    let dbUser = await User.findOne({ email: request.query.email });
    console.log(dbUser);
    console.log(dbUser.favoriteLocations);
    response.send(dbUser.favoriteLocations);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

async function postFavorite(request, response, next) {
  console.log('from body', request.body.favoriteLocations);
  try {
    // Find EXACT object to update and push into favoriteLocations
    let dataToUpdate = await User.findOne({ email: request.body.email });
    console.log(dataToUpdate);
    dataToUpdate.favoriteLocations.push(request.body.favoriteLocations);

    // Put object with updated data.
    let updatedData = await User.findByIdAndUpdate(dataToUpdate._id, dataToUpdate, { new: true, overwrite: true });
    response.send(updatedData);
  } catch (error) {
    console.log('Error posting favorite');
    next(error);
  }
}
//POST: Adds a new favorite to a given user's favorites array
// async function postFavorite(request, response, next) {
//   let email = request.body.email;
//   let favoriteLocation = request.body.favoriteLocations;
//   try {
//     await User.findOneAndUpdate({
//       email: email
//     }, {
//       $push: {
//         favoriteLocations: favoriteLocation
//       }
//     }
//     )
//     response.status(200).send("Added favorite");
//   } catch(error) {
//     next(error);
//   }
// }

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
  let locationId = +request.query.locationId;
  console.log(locationId);
  try {
    let dataToUpdate = await User.findOne({ email: userEmail });
    console.log(dataToUpdate.favoriteLocations);
    let filteredLocations = dataToUpdate.favoriteLocations.filter(location => location.id !== locationId);
    dataToUpdate.favoriteLocations = filteredLocations;
    // await User.updateOne(
    //   {
    //     email: userEmail
    //   }, {
    //     $pull: { 'favoriteLocations': { id: dbLocation } }
    //   });

    // Put object with updated data.
    let updatedData = await User.findByIdAndUpdate(dataToUpdate._id, dataToUpdate, { new: true, overwrite: true });
    response.status(200).send(updatedData);
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
