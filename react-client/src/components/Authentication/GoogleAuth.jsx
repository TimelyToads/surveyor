import React from 'React';
import DocMeta from 'react-doc-meta';
import API_KEYS from '../../../../lib/api_keys.js';
import AuthHelper from '../../../../lib/AuthHelper.js';
import axios from 'axios';

const GAPI_KEYS = API_KEYS.googleKeys;
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
      axios.get('/users/email', { params: { email: googleUserObject.email } })  
      .then(userObj => { this.props.authenticateUser(userObj.data) })
      .catch(err => { 
        // IF the User does not exist in the DB an Error will be caught, 
        // therefore just do an immediate POST with the same user data
        axios.post('/users', googleUserObject)
        .then(res => {
          console.log('Created new user in db ', googleUserObject);
          this.props.authenticateUser(googleUserObject);              
        })
        .catch(err => {
          console.log('ERROR creating user after Login');
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
      'apiKey': GAPI_KEYS.apiKey,
      'clientId': GAPI_KEYS.client_id,
      'scope': ['https://www.googleapis.com/auth/drive.metadata.readonly'],
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(() => {
      GoogAuth = gapi.auth2.getAuthInstance();
    });
  }

  // signOut() {

  // }

  // setSigninStatus(isSignedIn) {
  //   var user = GoogAuth.currentUser.get();
  //   var isAuthorized = user.hasGrantedScopes(SCOPE);
  //   if (isAuthorized) {
  //     $('#sign-in-or-out-button').html('Sign out');
  //     $('#revoke-access-button').css('display', 'inline-block');
  //     $('#auth-status').html('You are currently signed in and have granted ' +
  //         'access to this app.');
  //   } else {
  //     $('#sign-in-or-out-button').html('Sign In/Authorize');
  //     $('#revoke-access-button').css('display', 'none');
  //     $('#auth-status').html('You have not authorized this app or you are ' +
  //         'signed out.');
  //   }
  // }


  render() {
    const tags = [
      {name: "google-signin-client_id", content: `${GAPI_KEYS.client_id}`},
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
