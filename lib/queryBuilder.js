const defaultSearchCity = 'san francisco';
const defaultSearchState = 'CA';
const API_KEYS = require('./api_keys.js')
const ageLimit = 3;
const resultsLimit = 5;

let buildIndeedAPIQuery = (queryParams) => {
  console.log('QUERY PARAMS: ', queryParams);
  return `http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${queryParams.publisher_id}&q=${queryParams.body}&l=${queryParams.city}%2C+${queryParams.state}&userAgent=${queryParams.userAgent}&limit=${queryParams.resultLimit}&fromage=${queryParams.age}&radius=100`
}

let buildDiceAPIQuery = (queryParams) => {
  return `http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${queryParams.body}&city=${queryParams.city}&state=${queryParams.state}&sort=1&age=${queryParams.age}&pgcnt=${queryParams.resultLimit}`;
}

let setQueryDefaults = (details) => {
  details.city = defaultSearchCity;
  details.state = defaultSearchState;
  details.publisher_id = process.env.INDEED || API_KEYS.indeed_publisher_id;
  details.age = ageLimit;
  details.resultLimit = resultsLimit;
  return details;
}

module.exports = {
  buildDiceAPIQuery: buildDiceAPIQuery,
  buildIndeedAPIQuery: buildIndeedAPIQuery,
  setQueryDefaults: setQueryDefaults
}