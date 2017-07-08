import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import JobList from './components/Jobs/JobList.jsx';
import AppsList from './components/AppsList.jsx';
import Save from './components/Save.jsx';
import Loading from './components/Loading.jsx';
import Dropzone from 'react-dropzone';
import Login from './components/Authentication/Login.jsx';
import GoogleAuth from './components/Authentication/GoogleAuth.jsx';
import Top from './components/Top.jsx';
import Navigation from './components/Navigation.jsx'
import MainMenu from './components/MainMenu.jsx'
import LandingImage from './components/LandingImage.jsx';
import JobSearch from './components/Jobs/JobSearch.jsx';
import { Input, Button, Icon, Header, Image, Form, Divider } from 'semantic-ui-react'
import { createStore } from 'redux';
import modifyState from '../../server/modifyState.js';
import { dragLeave, dragEnter, searchJobs, loadPreviousResume, loginUser, logoutUser, setView } from '../../server/actions.js';

let defaultAppState = {
  jobs: [],
  loadingPreviousResume: false,
  isAuthenticated: false,
  view: 'login',
}

let store = createStore(modifyState, defaultAppState);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: store.getState().view,
      errMsg: '',
      dropzoneActive: false,
      user: {}
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSaveJob = this.onSaveJob.bind(this);
  }
  
  authenticateUser(userObj) {
    console.log('Calling authenticateUser');
    if (userObj) {
      store.dispatch(loginUser());
      store.dispatch(setView('start'));
      this.setState({
        user: userObj
      })
    } else {
      store.dispatch(logoutUser());
      store.dispatch(setView('login'));
      this.setState({
        user: {}
      })
    }
  }

  setUserObject(userObj) {
    this.setState( {user: userObj} );
  }

  isUserAuthenticated() {
    return store.getState().isAuthenticated;
  }


  onSearch(query) {
    store.dispatch(setView('loading'));
    this.setState( {view: 'loading'} );

    setTimeout(() => {
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query})
      })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        
        if (result.error) {
          throw err;
        }
        console.log('Received job results: ', result);
        store.dispatch(searchJobs(result));
        store.dispatch(setView('jobs'));
        this.setState({view: 'jobs' });
      })
      .catch(err => {
        this.setState({
          view: 'search',
          errMsg: err + ''
        })
      });
    }, 4000)
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });

  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    this.setState({ view: 'loading' });
    
    let formData = new FormData();

    store.dispatch(dragLeave());
    this.setState({ files, dropzoneActive: false });
    formData.append('file', files[0]);

    fetch('/upload', {
      method: 'POST', body: formData
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (result.error) {
        throw err;
      }

      var query = result.join(', ');
      this.onSearch(query);
    })
    .catch(err => {
      this.setState({ view: 'search', errMsg: err + ''});
    })
  }


  onSaveJob(job) {
    console.log(job);
    console.log(this.state.user);
    axios.post(`/api/users/${this.state.user.username}/jobs`, job)
      .then( status => {
        console.log(status);
      })
      .catch(error => {
        console.log('Error in OnSaveJob', error);
      })
  }

  handleItemClick (e) {
    console.log('this is the motha fuckin name', e);
    this.setState({ view: e });
  }


  render () {
    const { accept, files , dropzoneActive } = this.state;
    const { jobs, loadingPreviousResume, isAuthenticated, view } = store.getState();
    console.log('Jobs ', jobs);
    var style = {};
    if (dropzoneActive) {
      console.log('activiting blur');
      style = {
        'WebkitFilter': 'blur(3px)',
        'MozFilter': 'blur(3px)',
        'OFilter': 'blur(3px)',
        'msFilter': 'blur(3px)',
        'filter': 'blur(3px)'
      };
    }

    return (
      <div>

        <MainMenu view={view} handleItemClick={this.handleItemClick.bind(this)}/>      
        <Dropzone disableClick style={{}} accept={accept} onDrop={this.onDrop.bind(this)} onDragEnter={this.onDragEnter.bind(this)} onDragLeave={this.onDragLeave.bind(this)} >
          { dropzoneActive && <div className="overlay">Release to Search</div> }
          <div style={style}>
            <Top jobs={jobs}/>
            <Navigation 
              view={view} 
              loadingPrevious={loadingPreviousResume} 
              jobs={jobs} 
              errMsg={this.state.errMsg}
              isUserAuthenticated={this.isUserAuthenticated.bind(this)} 
              authenticateUser={this.authenticateUser.bind(this)} 
              onSaveJob={this.onSaveJob}
              user={this.state.user}
              />
          </div>
        </Dropzone>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export { store }

