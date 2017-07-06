let buildIndeedAPIQuery = (queryParams) => {
  console.log('QUERY PARAMS: ', queryParams);
  return `http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${queryParams.publisher_id}&q=${queryParams.body}&l=${queryParams.city}%2C+${queryParams.state}&userAgent=${queryParams.userAgent}&limit=${queryParams.resultLimit}&fromage=${queryParams.age}&radius=100`
}

let buildDiceAPIQuery = (queryParams) => {
  return `http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${queryParams.body}&city=${queryParams.city}&state=${queryParams.state}&sort=1&age=${queryParams.age}&pgcnt=${queryParams.resultLimit}`;
}


module.exports = {
  buildDiceAPIQuery: buildDiceAPIQuery,
  buildIndeedAPIQuery: buildIndeedAPIQuery
}