import React from 'React';
import DocMeta from 'react-doc-meta';
import API_KEYS from '../../../../lib/api_keys.js';
import AuthHelper from '../../../../lib/AuthHelper.js';
import axios from 'axios';

let GoogAuth;

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 200,
			'height': 35,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': this.onSignInSuccess.bind(this),
      'onfailure': this.onSignInFailure.bind(this)
		});
  }

  onSignInSuccess(googleData) {
    let googleUserObject = AuthHelper.retrieveUserInfo(googleData);

    window.authToken = googleData.getAuthResponse().id_token;
    
    AuthHelper.isTokenValid()
    .then(res => {    
      // GET User from the DB    
      axios.get(`/api/users/${googleUserObject.username}`)  
      .then(userObj => { this.props.authenticateUser(userObj.data) })
      .catch(err => { 
        // IF the User does not exist in the DB an Error will be caught, 
        // therefore just do an immediate POST with the same user data
        axios.post('/api/users', googleUserObject)
        .then(res => {
          console.log('Created new user in db ', googleUserObject);
          this.props.authenticateUser(googleUserObject);              
        })
        .catch(err => {
          console.log('ERROR creating user after Login', err);
        });
      });          
    })
    .catch(err => {
      console.log('ERROR validating token', err);
    });
  }

  onSignInFailure(err) {
    console.log('Failed to Sign-in to Google', err);
  }

  initClient() {
    gapi.client.init({
      'apiKey': API_KEYS.g_apiKey,
      'clientId': API_KEYS.g_client_id,
      'scope': ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/calendar'],
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(() => {
      GoogAuth = gapi.auth2.getAuthInstance();
    });
  }

  render() {
    const tags = [
      {name: "google-signin-client_id", content: `${API_KEYS.g_client_id}`},
      {name: "google-signin-scope", content: "profile email"}
    ]
    return (
      <div>
        <DocMeta tags={tags} />
        <div id="g-signin2">  </div>
        <hr/>
      </div>
    )
  }
}


export default GoogleAuth;
