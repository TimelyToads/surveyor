import React from 'react';
import { store } from '../index.jsx';

let Top = () => {
  
  const { jobs } = store.getState();
    return (
      <div>
        {jobs.length !== 0 ? <span></span> : <span></span>}        
      </div>
    );
  
}

export default Top;