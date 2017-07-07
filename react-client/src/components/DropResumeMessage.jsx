import React from 'react';
import { Message, Icon, Divider } from 'semantic-ui-react'

let DropResumeMessage = () => {
  return (
      <div id="upload_resume_message_box">
        <Message size="small" color="blue">
          <Message.Header><Icon name="upload" size="small"  /> Upload your resume </Message.Header>
          <p>Drag and drop any .doc, .docx, or .pdf document</p>
        </Message> 
        <Divider hidden />
     </div>
  );
}

export default DropResumeMessage