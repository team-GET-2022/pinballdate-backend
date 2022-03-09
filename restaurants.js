const axios = require('axios');

async function getRestaurants(request, response, next) {
  try {

    let searchQuery = request.query.searchQuery;

    let url = `https://api.yelp.com/v3/businesses/search?location=${searchQuery}&term=restaurants&radius=1000`; //works

    let yelpResults = await axios.get(url, {
      headers: {
        'Authorization' : 'Bearer fUNaVUUWgG2zgKrvXxeF7sLZj2ennSV-TxI7KxPxSKdd5gHXOIR5DBE3tVwfoZh4FbYGT0Qq2ga-m9sWiFUfg3ZrYH3cO7cwnGhZxQE_avLzDnni5TklYq8lYM4nYnYx'
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