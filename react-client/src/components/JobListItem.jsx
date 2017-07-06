import React from 'react';
import { Header, Table, Rating, Image, Label, Button } from 'semantic-ui-react'
import Logo from './Logo.jsx';

class JobListItem extends React.Component {
	constructor(props) {
		super(props);
    this.handleSaveJob = this.handleSaveJob.bind(this);
	}

  handleSaveJob(e) {
    this.props.onSaveJob(this.props.jobListItem);
  }
	render() {
		return (

				<Table.Row>
					<Table.Cell singleLine> 
						 <Logo jobListItem={this.props.jobListItem} /> 
					</Table.Cell>
					<Table.Cell width="1" >
						 {this.props.jobListItem.company}
					</Table.Cell>
					<Table.Cell>	
						{this.props.jobListItem.title}
					</Table.Cell>
					<Table.Cell textAlign='left' width="10">
						{this.props.jobListItem.description}
					</Table.Cell>
					<Table.Cell singleLine> 
						{this.props.jobListItem.formattedLocation}
					</Table.Cell>
					<Table.Cell singleLine>
						{this.props.jobListItem.postingDate} 
					</Table.Cell>
					<Table.Cell>
						<a href={this.props.jobListItem.url} target="_blank">Apply</a>
					</Table.Cell>
          <Table.Cell>
            <Button onClick={this.handleSaveJob}>Save</Button>
          </Table.Cell>
				</Table.Row>
		
		)


	} //end render
};

export default JobListItem;