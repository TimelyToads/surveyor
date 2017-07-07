import JobList from './Jobs/JobList.jsx';
import DragAndDrop from './DragAndDrop.jsx'
import DropResumeMessage from './DropResumeMessage.jsx'
import Loading from './Loading.jsx';
import React from 'react';
import GoogleAuth from './Authentication/GoogleAuth.jsx';
import LandingImage from './LandingImage.jsx';
import JobSearch from './Jobs/JobSearch.jsx';
import { Divider } from 'semantic-ui-react';
import AppsList from './AppsList.jsx';

let Navigation = (props) => {
      if (props.view === 'login') {
        return <GoogleAuth isUserAuthenticated={props.isUserAuthenticated} authenticateUser={props.authenticateUser} />
      } else if (props.view === 'start') {
        return (
          <div>
            <LandingImage />
            <JobSearch />
            <DragAndDrop errMsg={props.errMsg} />
          </div>
        )
      } else if (props.view === 'loading') {
        return <Loading loadingPrevious={props.loadingPrevious}/>
      } else if (props.view === 'jobs') {
        return (
            <div>
              <Divider hidden />
               <Divider hidden />
               <DropResumeMessage />
              <JobList jobList={props.jobs} saveQuery={props.saveQuery} onSaveJob={props.onSaveJob}/>
            </div>
        )
      } else if (props.view === 'apps') {
        return (
          <AppsList />
        );
      }else {
        return null;
      }
      
}

export default Navigation;

