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
    <Table.Row>

      <Table.Cell singleLine width="1" > 
        <Label as='a' image>
          <Image src='images/indeed.com-logo.png' />
          {props.app.job_site}
        </Label>
      </Table.Cell>
      <Table.Cell width="1" >
          {props.app.company}
      </Table.Cell>
      <Table.Cell>	
        {props.app.title}
      </Table.Cell>
      <Table.Cell textAlign='right'>
        {/*/*   THIS SHOULD CHANGE TO: LOCATION   */}
        {props.app.job_id} 
      </Table.Cell>
      <Table.Cell> 
        {props.app.keywords[0]}<br />
        {props.app.keywords[1]}
      </Table.Cell>
      <Table.Cell singleLine>
        {props.app.date_applied} 
      </Table.Cell>
      <Table.Cell>
        {props.app.resume}
      </Table.Cell>
      <Table.Cell>
        {props.app.date_applied}
      </Table.Cell>

    </Table.Row>
  );
};

export default AppsListItem;
