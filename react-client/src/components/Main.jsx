import JobList from './JobList.jsx';
import Start from './Start.jsx'
import Loading from './Loading.jsx';
import React from 'react';
import LoginModal from './Authentication/LoginModal.jsx';
import GoogleAuth from './Authentication/GoogleAuth.jsx';

let Main = (props) => {
      if (props.view === 'login') {
        return <GoogleAuth isUserAuthenticated={props.isUserAuthenticated} authenticateUser={props.authenticateUser} />
      } else if (props.view === 'start') {
        return <Start errMsg={props.errMsg} />
      } else if (props.view === 'loading') {
        return <Loading loadingPrevious={props.loadingPrevious}/>
      } else if (props.view === 'jobs') {
        return <JobList jobList={props.jobs} saveQuery={props.saveQuery} onSaveJob={props.onSaveJob}/>
      } else {
        return null;
      }
          
}

export default Main;