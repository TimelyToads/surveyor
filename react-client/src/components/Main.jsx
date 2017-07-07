import JobList from './JobList.jsx';
import Start from './Start.jsx'
import Loading from './Loading.jsx';
import AppsList from './AppsList.jsx';
import React from 'react';

let Main = (props) => {
          
      if (props.view === 'search') {
        return <Start errMsg={props.errMsg} />
      } else if (props.view === 'loading') {
        return <Loading loadingPrevious={props.loadingPrevious}/>
      } else if (props.view === 'jobs') {
        return <JobList jobList={props.jobs} saveQuery={props.saveQuery}/>
      } else if (props.view === 'apps') {
        return <AppsList />
      } else {
        return null;
      }
          
}

export default Main;