'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  favoriteLocations: [Object]
});

const User = mongoose.model('User', userSchema);

module.exports = User;