require('dotenv').config();

const YelpGraphQL = require('yelp-graphql');

const apiKey = process.env.YELP_KEY

let yelp = new YelpGraphQL({ apiKey });

exports.search = (req, res) => {
  console.log('HEYYYYY')
  const query = `query Search($term: String, $location: String){
    search(term: $term, limit: 5, location: $location) {
      business {
        name
        alias
        rating
        review_count
        price
        distance
        location {
          formatted_address
        }
        photos
        url
      }
    }
  }`;

  const variables = { term: `${req.body.term} restaurants`, location: req.body.location };
  const locale = req.body.locale;
  // Query Yelp
  yelp.query({ locale, query, variables }).then( (response) => {
    res.json(response.data)
  }).catch((err) => {
    res.json(err);
  })
}