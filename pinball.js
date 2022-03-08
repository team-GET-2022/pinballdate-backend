'use strict';

const axios = require('axios');
// const res = require('express/lib/response');

async function getPinball(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;
    // let url = `https://pinballmap.com/api/v1/locations/closest_by_address.json?address=${searchQuery}`; //works
    let url2 = `https://pinballmap.com/api/v1/locations/closest_by_address.json?send_all_within_distance=true;no_details=1;by_machine_id=2771;address=${searchQuery};max_distance=50`; //works
    let results = await axios.get(url2);
    console.log('results ', results.data); //works
    response.send(results.data.locations); //works
    // response.send(results.data.location.name); //works
    // response.send(results.data.location); //works
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
