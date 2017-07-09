import React from 'react';
import JobListItem from './JobListItem.jsx';
import { Header, Table, Rating, Segment } from 'semantic-ui-react'
import { store } from '../../index.jsx';


class JobList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { jobs } = store.getState();
		return (
			<div>
				<Segment>
			    <Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Source</Table.HeaderCell>
								<Table.HeaderCell width="1">Company</Table.HeaderCell>
								<Table.HeaderCell>Job Title</Table.HeaderCell>
								<Table.HeaderCell width="10">Job Description</Table.HeaderCell>
								<Table.HeaderCell>Location</Table.HeaderCell>
								<Table.HeaderCell>Posted</Table.HeaderCell>
								<Table.HeaderCell>Link</Table.HeaderCell>
								<Table.HeaderCell>Save</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
					<Table.Body>
							{/* {this.props.jobList.map( (item, index) => <JobListItem key={index} jobListItem = {item} onSaveJob={this.props.onSaveJob}/>)} */}
							{jobs.map( (item, index) => <JobListItem key={index} jobListItem={item} onSaveJob={this.props.onSaveJob}/>)}
					</Table.Body>
				</Table>
			</Segment>
			</div>
		)
	} // end render
};

export default JobList;

