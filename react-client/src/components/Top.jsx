import React from 'react';

class Top extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.jobs.length !== 0 ? <span></span> : <span></span>}        
      </div>
    );
  }
}

export default Top;