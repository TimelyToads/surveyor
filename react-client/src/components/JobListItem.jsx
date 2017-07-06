import React from 'react';
import { Header, Table, Rating, Image, Label } from 'semantic-ui-react'
import Logo from './Logo.jsx';

class JobListItem extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (

				<Table.Row>
					<Table.Cell singleLine> 
						{/* <Logo jobListItem={this.props.jobListItem} /> */}
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
						<a href={this.props.jobListItem.url}>Apply</a>
					</Table.Cell>
				</Table.Row>
		
		)


	} //end render
};

export default JobListItem;
			// {this.props.jobListItem.company}
			// <div className="content">
			// 		<div className="header">
			// 			<a href={this.props.jobListItem.url}>
			// 				{this.props.jobListItem.jobtitle}
			// 			</a>
			// 		</div>
			// 		<div className="content">
			// 			<div className="header">
			// 				<b>{this.props.jobListItem.company}</b> &nbsp;&nbsp;&nbsp;&nbsp;
			// 						<span className="meta">{this.props.jobListItem.formattedLocation} </span>
			// 			</div>
			// 			<div className="description">
			// 				{this.props.jobListItem.snippet}
			// 			</div>
			// 			<div className="meta">
			// 				{this.props.jobListItem.formattedRelativeTime} 
			// 			</div>
			// 		</div>
			// 	</div>