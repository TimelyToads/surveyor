const Promise = require('bluebird');
const geoip2 = require('geoip2');

let lookupLocationBasedOnIPAddress = (ipAddress) => {
  console.log('Calling lookupIP with ipaddress: ', ipAddress);
  
  return new Promise( (resolve, reject) => {
    geoip2.init();

    geoip2.lookupSimple(ipAddress, (err, locationInfo) => {
      if (err) {
        console.log('Inside locationFinder ERROR retrieving IP Address', err);
        reject(err);
      } else if (locationInfo){
        resolve(locationInfo);
      }
    });
  })
} 


module.exports = {
  lookupLocationBasedOnIPAddress: lookupLocationBasedOnIPAddress
}

