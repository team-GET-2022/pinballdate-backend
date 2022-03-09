'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/user.js');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


async function postUser(request, response, next) {

  try {
    let dbUser = await User.find({ email: request.body.email });
    console.log('dbUser is ', dbUser);
    if (dbUser.length > 0) { //[] is truthy
    // if (userEmail === dbUser.email) {
      response.status(200).send('user already exists');
    } else {
      let data = request.body;
      await User.create(data);
      response.status(200).send('user created');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = postUser;


