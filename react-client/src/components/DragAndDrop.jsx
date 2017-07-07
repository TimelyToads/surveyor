import React from 'react';
import DropResumeMessage from './DropResumeMessage.jsx';

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <div className="dropzone">
          {this.props.errMsg.length > 0
          ? <h3> There was an error analyzing your resume. Please try again.</h3>
          : null
          }
        </div>
        <DropResumeMessage />
    </div>
    );
  }
};

export default DragAndDrop;

  

  //  <Segment color="blue" size="big"> 
  //           <Icon name="upload" size="large"  /> Upload your resume
  //       </Segment>