import React from 'react';
// import AppActionsDashboard from './AppActionsDashboard.jsx'
import { Header, Table, Rating, Image, Label } from 'semantic-ui-react'

class AppsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = () => {
      this.props.handleClick(this.props.app.job_id);
    }
  }


  render() {

    if (this.props.activeJob) {
      return (

        <Table.Row textAlign='center' >
          {/*<AppActionsDashboard app={} />*/}
          <Image src='/images/indeed.com-logo.png' fluid />
        </Table.Row>

      );
    } else {
      return (

        <Table.Row textAlign='center' onClick={this.handleClick} >

            <Table.Cell>	
                {this.props.app.title}
            </Table.Cell>
            <Table.Cell>
                {this.props.app.company}
            </Table.Cell>
            <Table.Cell> 
              <Label as='a' image>
                <Image src='images/indeed.com-logo.png' />
                {this.props.app.job_site}
              </Label>
            </Table.Cell>
            <Table.Cell>
              {this.props.app.city}, {this.props.app.state}
            </Table.Cell>
            <Table.Cell singleLine >
              {this.props.app.date_applied} 
            </Table.Cell>
            <Table.Cell>
              {this.props.app.next_action}
            </Table.Cell>
            <Table.Cell singleLine >
              {this.props.app.action_date}
            </Table.Cell>
          
        </Table.Row>

      );
    }
  } 
};

export default AppsListItem;
