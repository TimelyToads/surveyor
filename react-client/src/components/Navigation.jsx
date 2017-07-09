import React from 'react';
import JobList from './Jobs/JobList.jsx';
import DragAndDrop from './DragAndDrop.jsx'
import DropResumeMessage from './DropResumeMessage.jsx'
import AppsList from './AppsList.jsx'
import Loading from './Loading.jsx';
import GoogleAuth from './Authentication/GoogleAuth.jsx';
import LandingImage from './LandingImage.jsx';
import JobSearch from './Jobs/JobSearch.jsx';
import { Divider } from 'semantic-ui-react';
import { store } from '../index.jsx';

let Navigation = (props) => {
   
  const { view, user } = store.getState();

  if (view === 'login') {
    return <GoogleAuth updateView={props.updateView} />
  } else if (view === 'start') {
    return (
      <div>
        <LandingImage />
        <JobSearch />
        <DragAndDrop errMsg={props.errMsg} />
      </div>
    )
  } else if (view === 'loading') {
    return <Loading loadingPrevious={props.loadingPrevious}/>
  } else if (view === 'jobs') {
    return (
        <div>
          <Divider hidden />
          <Divider hidden />
          <DropResumeMessage />
          <JobList onSaveJob={props.onSaveJob}/>
        </div>
    )
  } else if (view === 'apps') {
    return (
      <AppsList user={user} />
    );
  }else {
    return null;
  }
      
}

export default Navigation;

