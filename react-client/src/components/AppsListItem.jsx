import React from 'react';
import { Header, Table, Rating, Image, Label } from 'semantic-ui-react'

  {/*<Table.Row>
    <Table.HeaderCell>Source</Table.HeaderCell>
    <Table.HeaderCell>Company</Table.HeaderCell>
    <Table.HeaderCell>Job Title</Table.HeaderCell>
    <Table.HeaderCell>Location</Table.HeaderCell>
    <Table.HeaderCell>Resume Keywords</Table.HeaderCell>
    <Table.HeaderCell>Applied</Table.HeaderCell>
    <Table.HeaderCell>Next Action</Table.HeaderCell>
    <Table.HeaderCell>Due</Table.HeaderCell>
  </Table.Row>*/}

function AppsListItem(props) {

  return (
    <Table.Row textAlign='center' >

      <Table.Cell> 
        <Label as='a' image>
          <Image src='images/indeed.com-logo.png' />
          {props.app.job_site}
        </Label>
      </Table.Cell>
      <Table.Cell>
          {props.app.company}
      </Table.Cell>
      <Table.Cell>	
        {props.app.title}
      </Table.Cell>
      <Table.Cell>
        {props.app.city}, {props.app.state}
      </Table.Cell>
      <Table.Cell singleLine > 
        {props.app.keywords[0]}<br />
        {props.app.keywords[1]}
      </Table.Cell>
      <Table.Cell singleLine >
        {props.app.date_applied} 
      </Table.Cell>
      <Table.Cell>
        {props.app.next_action}
      </Table.Cell>
      <Table.Cell singleLine >
        {props.app.action_date}
      </Table.Cell>

    </Table.Row>
  );
};

export default AppsListItem;
