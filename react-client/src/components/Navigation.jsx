import JobList from './JobList.jsx';
import DropResume from './DropResume.jsx'
import Loading from './Loading.jsx';
import React from 'react';
import GoogleAuth from './Authentication/GoogleAuth.jsx';
import LandingImage from './LandingImage.jsx';
import JobSearch from './Jobs/JobSearch.jsx';

let Navigation = (props) => {
      if (props.view === 'login') {
        return <GoogleAuth isUserAuthenticated={props.isUserAuthenticated} authenticateUser={props.authenticateUser} />
      } else if (props.view === 'start') {
        return (
          <div>
            <LandingImage />
            <JobSearch />
            <DropResume errMsg={props.errMsg} />
          </div>
        )
      } else if (props.view === 'loading') {
        return <Loading loadingPrevious={props.loadingPrevious}/>
      } else if (props.view === 'jobs') {
        return (
            <div>
              <JobSearch />
              <JobList jobList={props.jobs} saveQuery={props.saveQuery} onSaveJob={props.onSaveJob}/>
            </div>
        )
      } else {
        return null;
      }
          
}

export default Navigation;

