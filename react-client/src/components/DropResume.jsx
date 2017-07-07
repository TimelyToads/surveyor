import React from 'react';
import { Form, Input, Button, Icon, Divider, Message, Segment} from 'semantic-ui-react'

class DropResume extends React.Component {
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
      <div id="upload_resume_link">
        <Segment inverted color="blue" size="mini"> 
            sdffd
        </Segment>
      </div>
    </div>
    );
  }
};

export default DropResume;

       <Message size="medium" color="blue" className="uploadMessage">
          <Message.Header><Icon name="upload" size="large"  /> Upload your resume </Message.Header>
          <p>Drag and drop any .doc, .docx, or .pdf document</p>
        </Message>  