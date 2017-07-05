import React from 'react';
import JobListItem from './JobListItem.jsx';
import Save from './Save.jsx';
import { Header, Table, Rating, Form } from 'semantic-ui-react'


class JobList extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {

		return (
					<div>
						<Form>
			    <Table celled padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Source</Table.HeaderCell>
							<Table.HeaderCell width="1">Company</Table.HeaderCell>
							<Table.HeaderCell>Job Title</Table.HeaderCell>
							<Table.HeaderCell>Job Description</Table.HeaderCell>
							<Table.HeaderCell>Location</Table.HeaderCell>
							<Table.HeaderCell>Posted</Table.HeaderCell>
							<Table.HeaderCell>Link</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
					
							{this.props.jobList.map( (item, index) => <JobListItem key={index} jobListItem = {item}/>)}
				
					</Table.Body>
				</Table>
	</Form>
			</div>
		)
	} // end render
};

export default JobList;


		// <div>
		// 				<Save saveQuery={this.props.saveQuery}/>
		// 			</div>