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
import actions from '../../server/actions.js';

let defaultAppState = {
  jobs: [],
  loadingPreviousResume: false,
  isAuthenticated: false,
  view: 'login',
  user: {}
}

let store = createStore(modifyState, defaultAppState);
export { store }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: store.getState().view,
      errMsg: '',
      dropzoneActive: false,
    };
  }
  
  updateView(newView) {
    this.setState( { view: newView });
  }

  onSearch(query) {
    store.dispatch(actions.setView('loading'));
    this.setState( {view: 'loading' })

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
        store.dispatch(actions.searchJobs(result));
        store.dispatch(actions.setView('jobs'));
        this.setState( {view: 'jobs' } )
      })
      .catch(err => {
        store.dispatch(actions.setView('search'));
        this.setState({errMsg: err + '', view: 'search' })
      });
    }, 4000)
  }

  onDragEnter() {
    this.setState({ dropzoneActive: true });
  }

  onDragLeave() {
    this.setState({ dropzoneActive: false });
  }

  onDrop(files) {
    store.dispatch(actions.dragLeave());
    store.dispatch(actions.setView('loading'));
    this.setState( Object.assign(this.state, store.getState() ));
    
    let formData = new FormData();

    
    // this.setState({ files: false });
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
      this.onSearch.call(this, query);
      // this.onSearch(query);
    })
    .catch(err => {
      store.dispatch(actions.setView('search'));
      this.setState({ errMsg: err + '', view: 'search' });
    })
  }


  onSaveJob(job) {
    axios.post(`/api/users/${store.getState().user.username}/jobs`, job)
      .then( status => {
        console.log(status);
      })
      .catch(error => {
        console.log('Error in OnSaveJob', error);
      })
  }

  handleItemClick (e) {
    console.log('this is the motha fuckin name', e);
    store.dispatch(actions.setView(e));
    this.setState( {view: e })
    // this.setState( Object.assign(this.state, store.getState() ));
  }


  render () {
    const { accept, dropzoneActive } = this.state;
    const { jobs, loadingPreviousResume, isAuthenticated, view, user } = store.getState();
    console.log('Inside index.jsx: ', store.getState());
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
              loadingPrevious={loadingPreviousResume} 
              errMsg={this.state.errMsg}
              updateView={this.updateView.bind(this)} 
              onSaveJob={this.onSaveJob}
              />
          </div>
        </Dropzone>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));



