import React from 'react';
import DocMeta from 'react-doc-meta';
import API_KEYS from '../../../../lib/api_keys.js';
import AuthHelper from '../../../../lib/AuthHelper.js';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

let GoogAuth;

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: true,
      closeOnEscape: false,
      closeOnRootNodeClick: false
    }
  }

  componentDidMount() {
    gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 175,
      'height': 32,
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
          this.props.authenticateUser(googleUserObject); 
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
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest','https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
  }).then(() => {
      GoogAuth = gapi.auth2.getAuthInstance();
    });
  }

  render() {
    const tags = [
      {name: "google-signin-client_id", content: `${API_KEYS.g_client_id}`},
      {name: "google-signin-scope", content: "profile email"}
    ]
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state
    return (
      <div>
         
      <DocMeta tags={tags} />
      <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
          basic size='small'
        >
          <Header icon='laptop' content='Sign-in to @Jobs' />
           <Modal.Content>
            <p>In order to upload your resume, please login or sign-up.</p>
          </Modal.Content>
          <Modal.Actions>
         
            
     
             <Button color='blue'  id="g-signin2" basic compact>
              Sign up @Jobs
            </Button>
             <Button color='blue' basic size="big" id="sign_up_button">
              Sign up @Jobs
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}


export default GoogleAuth;
