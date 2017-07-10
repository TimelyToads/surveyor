import React from 'react';
import AppActionsDashboard from './AppActionsDashboard.jsx'
import { Header, Table, Rating, Image, Label } from 'semantic-ui-react'
import Logo from './Logo.jsx';
import moment from 'moment'
var date = str => moment(str).format('dddd[,] MMM D');

class AppsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.props.app.actions.sort( (a, b) => {
      return b.date > a.date ? -1 : 1;
    });

    this.state = {
      focusAction: this.props.app.actions.find( action => {
        return !action.completed;
      }) || { date: '-', type: '-' },
    };

  }

  render() {

    return (

      <Table.Row textAlign='center' >

        <Table.Cell>	
          <AppActionsDashboard app={this.props.app} />
        </Table.Cell>
        <Table.Cell>
          {this.state.focusAction.type}
        </Table.Cell>
        <Table.Cell>
          {date(this.state.focusAction.date).includes('Invalid date') ? '-' : date(this.state.focusAction.date)}
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
