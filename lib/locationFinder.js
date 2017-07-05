const Bluebird = require('bluebird');
const geoip2 = require('geoip2');

let lookupLocationBasedOnIPAddress = (ipAddress) => {
  console.log('Calling lookupIP with ipaddress: ', ipAddress);
  
  return new Bluebird.Promise( (resolve, reject) => {
    geoip2.init();

    geoip2.lookupSimple(ipAddress, (err, locationInfo) => {
      if (err) {
        console.log('ERROR retrieving IP Address', err);
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

