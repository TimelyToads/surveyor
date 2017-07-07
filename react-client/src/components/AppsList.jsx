import React from 'react';
import _ from 'lodash';
import AppsListItem from './AppsListItem.jsx';
// import Save from './Save.jsx';
import { Header, Table, Rating } from 'semantic-ui-react'
import data from '../../../database/mockData.js'

class AppsList extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      // column: null,
      // direction: null,
      data: data,
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
    console.log('EVENTUALLY fetch something from the DB:', data);
    // this.setState({
    //   activeJob: data[2].job_id
    // });
  }

  handleClick(id) {
    console.log('Table.Row click event: ', id);
    this.setState({
      activeJob: id
    })
  }

	render() {

		return (
      <div>
        <Table celled selectable >
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Details</Table.HeaderCell>
							<Table.HeaderCell>Job Title</Table.HeaderCell>
							<Table.HeaderCell>Company</Table.HeaderCell>
							<Table.HeaderCell>Source</Table.HeaderCell>
							<Table.HeaderCell>Location</Table.HeaderCell>
							<Table.HeaderCell>Applied</Table.HeaderCell>
							<Table.HeaderCell>Next Action</Table.HeaderCell>
							<Table.HeaderCell>Due</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>

            {this.state.data.map( (app, index) => <AppsListItem 
              handleClick={this.handleClick}
              activeJob={this.state.activeJob === app.job_id} 
              key={index} 
              app={app} /> )
            }

					</Table.Body>
				</Table>
			</div>
		)
	} // end render
};

export default AppsList;
