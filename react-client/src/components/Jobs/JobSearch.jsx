import React from 'react';
import { Form, Input, Button, Icon, Divider} from 'semantic-ui-react'

let JobSearch = (props) => {
  return (
    <div>
      <Form id="searchForm">
        <Input id="description" placeholder='Job Title, Keywords, or Company' size="large" />         
        <Input id="city" placeholder='City' size="large" />
        <Input id="state" placeholder='State' size="large" />
        <Button icon='search' size="large" color="blue" />
        <br />
      </Form>
    </div>
  )
}

export default JobSearch