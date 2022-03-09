/*
This route responds with raw search data from the Pinball Maps API. You can review 
Pinball Maps' API docs here: https://pinballmap.com/api/v1/docs
*/
'use strict';

const axios = require('axios');

async function getPinball(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;

    let url = `https://pinballmap.com/api/v1/locations/closest_by_address.json?send_all_within_distance=true;no_details=1;by_machine_id=2771;address=${searchQuery};max_distance=50`; //works

    let results = await axios.get(url);

    response.send(results.data);

  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

module.exports = getPinball;