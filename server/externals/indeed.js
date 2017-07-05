const bluebird = require('bluebird');
const express = require('express');
const fetch = require('isomorphic-fetch');
const geoip2 = require('geoip2');
const bodyParser = require('body-parser');
// const indeed = process.env.INDEED;
const API_KEYS = require('../../lib/api_keys.js')
const indeed = API_KEYS.indeed_publisher_id;

let getJobPostings = (details, res, next) => {
  console.log('inside getJobPostings with details: ', details);
  let city = 'san francisco';
  let state = 'CA';

  details.city = 'san francisco';
  details.state = 'CA';

  ipLookup(details.ip)
    .then((result) => {
      console.log('iplookup result', result);
      details.city = result.city;
      details.state = result.subdivision;
      indeedFetch(details, res, next); 

    }).catch(error => { 
      indeedFetch(details, res, next);
    });
}

let indeedFetch = (data, res, next) => {
  console.log('Inside indeedFetch with data: ', data);

  fetch(`http://api.indeed.com/ads/apisearch?format=json&v=2&publisher=${indeed}&q=${data.body}&l=${data.city}%2C+${data.state}&userAgent=${data.userAgent}&limit=33&fromage=3&radius=100`, {
    method: 'GET'
  }).then((response, error) =>{
    if (error) 
      throw error;
    else 
      return response.json();
  }).then((rjson, error) => {
    if (error) 
      throw error;
    else {
      let newStr = JSON.stringify(rjson).replace(/<b>/g, "");
      newStr = newStr.replace(/<\/b>/g, "");
      console.log('Successfully got JSON back from indeed: ', newStr);
      res.send(JSON.parse(newStr));
    }
  }).catch(error => {
    console.log('Error fetching data from Indeed: ', error);
    res.send(error);
  });
}

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

module.exports = {
  getJobPostings: getJobPostings
}

/*
http://api.indeed.com/ads/apisearch?publisher=3533723820223786&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2

*/