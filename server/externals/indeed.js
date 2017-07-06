const Promise = require('bluebird');
const express = require('express');
const fetch = require('isomorphic-fetch');
const geoip2 = require('geoip2');
const bodyParser = require('body-parser');
// const indeed = process.env.INDEED;
const API_KEYS = require('../../lib/api_keys.js')
const locationFinder = require('../../lib/locationFinder.js');
const parseHelper = require('../../lib/parseHelper.js');
const queryBuilder = require('../../lib/queryBuilder.js');
const defaultSearchCity = 'san francisco';
const defaultSearchState = 'CA';
const axios = require('axios');




let getJobPostings = (details, res, next) => {
  console.log('inside getJobPostings with details: ', details);
  let allJobResults;
  
  locationFinder.lookupLocationBasedOnIPAddress(details.ip)
  .tap( locationInfo => {
    console.log('Inside TAP');
    //override search city and state based on ip address
    details.city = locationInfo.city;
    details.state = locationInfo.subdivision;
  })
  .catch( () => {
    console.log('Inside CATCH of getJobPostings()');
    details.city = defaultSearchCity;
    details.state = defaultSearchState;
    details.publisher_id = API_KEYS.indeed_publisher_id;
    details.age = 3;
    details.resultLimit = 5;
    return  axios.get(queryBuilder.buildIndeedAPIQuery(details));
  })
  .then( indeedJobResults => {    
    let indeedJobs = parseHelper.parseIndeedAPIData(indeedJobResults.data);
    console.log('Successfully retrieved results from INDEED API Call from indeed.js ', indeedJobs);
    allJobResults = indeedJobs;
    return details;
  })
  .then(callDiceJobsAPI)
  .then(parseHelper.parseDiceAPIData)
  .then( diceJobs => {
    console.log('DICE JOBS after Parsing: ', diceJobs);
    res.send(allJobResults.concat(diceJobs));
  })
  .catch( err => {
    console.log('ERROR retrieving results from Indeed API call ', err);
  })
  .error( err => {
    console.log('ERROR retrieving IP Location Info', err)
    callIndeedJobsAPI(details, res);
  })

}

let callDiceJobsAPI = (query) => {
  console.log('Calling callDiceJobsAPI');
  return axios.get(queryBuilder.buildDiceAPIQuery(query));
}





module.exports = {
  getJobPostings: getJobPostings
}

/*
http://api.indeed.com/ads/apisearch?publisher=3533723820223786&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2


// let callIndeedJobsAPI = (query, res) => {
//   axios.get(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${indeed}&q=${query.body}&l=${query.city}%2C+${query.state}&userAgent=${query.userAgent}&limit=2&fromage=3&radius=100`)
//   .then( jobPostings => {    
//     console.log('Successfully retrieved results from Indeed API Call from indeed.js ', jobPostings.data);
//     res.send(parseHelper.parseIndeedAPIData(jobPostings.data));
//   })
//   .catch( err => {
//     console.log('ERROR retrieving results from Indeed API call ', err);
//   })
// }
  // ipLookup(details.ip)
  //   .then((result) => {
  //     console.log('iplookup result', result);
  //     details.city = result.city;
  //     details.state = result.subdivision;
  //     indeedFetch(details, res, next); 

  //   }).catch(error => { 
  //     indeedFetch(details, res, next);
  //   });

  let ipLookup = ip => {
  return new Promise((reject, resolve) => {
      geoip2.lookupSimple(ip, (result, error) => {
        if (error) {
          console.log('Error lookingup IP: ', error);
          reject(error);
        }
        else {
          console.log('Successfully retrieved IP: ', result);
          resolve(result);
        }
      });
  });
}



// let indeedFetch = (data, res, next) => {
//   console.log('Inside indeedFetch with params passed in: ', data);

//   fetch(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${indeed}&q=${data.body}&l=${data.city}%2C+${data.state}&userAgent=${data.userAgent}&limit=2&fromage=3&radius=100`, {
//     method: 'GET'
//   }).then((response, error) =>{
//     if (error) 
//       throw error;
//     else 
//       return response.json();
//   }).then((rjson, error) => {
//     if (error) {
//       throw error;
//     } else {
//       let newStr = JSON.stringify(rjson).replace(/<b>/g, "");
//       newStr = newStr.replace(/<\/b>/g, "");
//       console.log('FETCH: Successfully got JSON back from indeed: ', newStr);
//       res.send(JSON.parse(newStr));
//     }
//   }).catch(error => {
//     console.log('Error fetching data from Indeed: ', error);
//     res.send(error);
//   });
// }
*/