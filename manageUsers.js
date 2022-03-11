'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/user.js');

mongoose.connect(process.env.DATABASE_URL);


async function postUser(request, response, next) {

  try {
    let dbUser = await User.find({ email: request.body.email });
    if (dbUser.length > 0) {
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


