import React from 'react';
import AppsListItem from './AppsListItem.jsx';
// import Save from './Save.jsx';
import { Header, Table, Rating } from 'semantic-ui-react'
import data from '../../../database/mockData.js'

class AppsList extends React.Component {
	constructor(props) {
		super(props);
	}

  componentDidMount() {
    console.log('EVENTUALLY fetch something from the DB:', data);
  }

	render() {

		return (
      <div>
        <Table celled padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Source</Table.HeaderCell>
							<Table.HeaderCell>Company</Table.HeaderCell>
							<Table.HeaderCell>Job Title</Table.HeaderCell>
							<Table.HeaderCell>Location</Table.HeaderCell>
							<Table.HeaderCell>Resume Keywords</Table.HeaderCell>
							<Table.HeaderCell>Applied</Table.HeaderCell>
							<Table.HeaderCell>Next Action</Table.HeaderCell>
							<Table.HeaderCell>Due</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>

            {data.map( app => <AppsListItem key={app.job_id} app={app} /> )}

					</Table.Body>
				</Table>
			</div>
		)
	} // end render
};

export default AppsList;
