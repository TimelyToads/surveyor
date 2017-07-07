import axios from 'axios';
import API_KEYS from './api_keys.js';

let methods = {};

methods.retrieveUserInfo = (googleUser) => {
  let profile = googleUser.getBasicProfile();

  return {
    username:     profile.getId(),
    first_name:   profile.getGivenName(),
    last_name:    profile.getFamilyName(),
    img_url:      profile.getImageUrl(),
    email:        profile.getEmail(),
  };
};

methods.getAuthenticatedUser = () => {
  if (window.authToken) {
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${window.authToken}`)
    .then(res => { return Promise.resolve(res) })
    .catch(err => { return Promise.reject(err) });
  }     
};

methods.isTokenValid = () => {
  if (window.authToken) {
    return axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${window.authToken}`)
  } else {
    return Promise.reject('window.authToken is UNDEFINED');
  }
  
};

export default methods;