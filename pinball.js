'use strict';

const axios = require('axios');
// const res = require('express/lib/response');

async function getPinball(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;
    let url = `https://pinballmap.com/api/v1/locations/closest_by_address.json?address=${searchQuery}`;
    let results = await axios.get(url);
    console.log('results ', results.data);
    response.send(results.data.location.name);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}



// class Pinball {
//   constructor() {

//   }
// }
// https://pinballmap.com/api/v1/docs
// https://pinballmap.com/api/v1/locations/closest_by_address.json

module.exports = getPinball;
