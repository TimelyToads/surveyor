import React from 'react';
import { Form, Input, Button, Icon, Divider} from 'semantic-ui-react'

let JobSearch = (props) => {
  return (
    <div id="landing_image">
       <p id="quote">
          "Your work is going to fill a large part of your life,<br/>
          and the only way to be truly satisfied is to do what you believe is great work"
        </p>
      <Form id="searchForm">
        <Input id="description" placeholder='Job Title, Keywords, or Company' size="large" />         
        <Input id="city" placeholder='City' size="large" />
        <Input id="state" placeholder='State' size="large" />
        <Button icon='search' size="large" color="blue" />
        <br />
        <br />
        <br />
        <div id="upload_resume_link">
          <Icon name="upload" size="large"  />
          Upload your resume
        </div>
      </Form>
    </div>
  )
}

export default JobSearch