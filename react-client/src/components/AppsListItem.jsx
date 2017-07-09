import React from 'react';
import AppActionsDashboard from './AppActionsDashboard.jsx'
import { Header, Table, Rating, Image, Label } from 'semantic-ui-react'
import Logo from './Logo.jsx';

class AppsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = () => {
      this.props.handleClick(this.props.app.id);
    }
  }


  render() {

    return (

      <Table.Row textAlign='center' onClick={this.handleClick} >

        <Table.Cell>	
          <AppActionsDashboard app={this.props.app} />
        </Table.Cell>
        <Table.Cell>
          {/* CHANGE THIS TO NEXT ACTION!!! */}
          {this.props.app.state}
        </Table.Cell>
        <Table.Cell>
          {/* CHANGE THIS TO NEXT ACTION DUE DATE!!! */}
          {this.props.app.city}
        </Table.Cell>
        <Table.Cell>
          {this.props.app.company}
        </Table.Cell>
        <Table.Cell>	
          <a href={this.props.app.url} >{this.props.app.title}</a>
        </Table.Cell>
        <Table.Cell>
          {this.props.app.formattedLocation}
        </Table.Cell>
        <Table.Cell singleLine > 
          <Logo size='mini' jobListItem={this.props.app} />
        </Table.Cell>
        
      </Table.Row>

    );
  } 
};

export default AppsListItem;
