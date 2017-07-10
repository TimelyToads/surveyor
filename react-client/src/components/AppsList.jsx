import React from 'react';
import _ from 'lodash';
import AppsListItem from './AppsListItem.jsx';
import { Segment, Header, Table } from 'semantic-ui-react'
import axios from 'axios'

class AppsList extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      apps: []
    };
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.user.username}/jobs`)
    .then(res => {
      this.setState({
        apps: res.data
      })
    })
    .catch(err => {
      console.log('ERROR fetching job applications from DB: ', err);
    });
  }

	render() {

    var applicationsList = this.state.apps.map( app => {
      return <AppsListItem key={app.id} app={app} />
    });

		return (
      <Segment>
        <Table selectable >
          <Table.Header>
            <Table.Row textAlign='center' >
              <Table.HeaderCell>Details</Table.HeaderCell>
              <Table.HeaderCell>Next Action</Table.HeaderCell>
              <Table.HeaderCell>Due</Table.HeaderCell>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {applicationsList}
          </Table.Body>
        </Table>
      </Segment>
		)
	} // end render
};

export default AppsList;
