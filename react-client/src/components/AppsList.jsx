import React from 'react';
import _ from 'lodash';
import AppsListItem from './AppsListItem.jsx';
import { Segment, Header, Table } from 'semantic-ui-react'
import axios from 'axios'

class AppsList extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      // column: null,
      // direction: null,
      apps: [],
      activeJob: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // handleSort = clickedColumn => () => {
  //   const { column, data, direction } = this.state;

  //   if (column !== clickedColumn) {
  //     this.setState({
  //       column: clickedColumn,
  //       data: _.sortBy(data, [clickedColumn]),
  //       direction: 'ascending',
  //     });

  //     return;
  //   }
  //   this.setState({
  //     data: data.reverse(),
  //     direction: direction === 'ascending' ? 'descending' : 'ascending',
  //   });
	// }

  componentDidMount() {
    axios.get(`/api/users/${this.props.user.username}/jobs`)
    .then(apps => {
      this.setState({
        apps: apps.data
      })
    })
    .catch(err => {
      console.log('ERROR fetching job applications from DB: ', err);
    });
  }

  handleClick(id) {
    console.log('Table.Row click event: ', id);
  }

	render() {

    var applicationsList = this.state.apps.map( app => {
      return <AppsListItem handleClick={this.handleClick} key={app.id} app={app} />
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
              <Table.HeaderCell>Applied</Table.HeaderCell>
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
