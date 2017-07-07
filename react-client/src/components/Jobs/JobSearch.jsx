import React from 'react';
import { Form, Input, Button, Icon} from 'semantic-ui-react'

let JobSearch = (props) => {
  return (
    <div id="landing_image">
      <Form id="searchForm">           
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