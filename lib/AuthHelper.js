import $ from 'jquery';
import API_KEYS from './api_keys.js';

const GAPI_KEYS = API_KEYS.googleKeys;
let methods = {};

methods.retrieveUserInfo = (googleUser) => {
  console.log('Inside AuthenticationHelper.retrieveUserInfo');
  let profile = googleUser.getBasicProfile();
  console.log('PROFILE', profile)
  // return {
  //   username:     profile.getId(),
  //   first_name:   profile.getGivenName(),
  //   last_name:    profile.getFamilyName(),
  //   img_url:      profile.getImageUrl(),
  //   email:        profile.getEmail(),
  //   password:     profile.getId()
  // };
};

methods.getAuthenticatedUser = () => {
  if (window.authToken) {
    $.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${window.authToken}`)
      .then( res => {
        return Promise.resolve(res);
      })
      .catch( err => {
        return Promise.reject(err);
      });
  }     
};

methods.isTokenValid = () => {
  console.log('Inside methods.isUserAuth ');
  if (window.authToken) {
    return $.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${window.authToken}`)
  } else {
    return Promise.reject('window.authToken is UNDEFINED');
  }
  
};

export default methods;