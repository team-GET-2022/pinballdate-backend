'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  favoriteMachines: { type: Array, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// {
//   "userEmail": "danb@gmail.com",
//     "favoriteMachines":
//       [
//         {
//           "locationName": "T-Bird's",
//           "machineName": "Jurassic Park",
//           "comments": "This game rules",
//           "yourHighScore": "7533103"
//         }

//       ]
// }
