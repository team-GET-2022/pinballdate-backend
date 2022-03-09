/*
This route accesses the Yelp API and sends raw search results from Yelp. 
You can review the Yelp docs here: https://www.yelp.com/developers/documentation/v3/business_search
*/

const axios = require('axios');

async function getRestaurants(request, response, next) {
  try {

    let searchQuery = request.query.searchQuery;

    let url = `https://api.yelp.com/v3/businesses/search?location=${searchQuery}&term=restaurants&radius=1000`;

    // The `radius` parameter measures distance in meters.

    let yelpResults = await axios.get(url, {
      headers: {
        Authorization: `bearer ${process.env.YELP_API_KEY}`
      }
    });

    response.send(yelpResults.data);
    //    console.log(yelpResults.data);

  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

module.exports = getRestaurants;