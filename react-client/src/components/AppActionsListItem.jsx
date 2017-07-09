import React from 'react'
import moment from 'moment'
var date = str => moment(str).format('dddd[,] MMM D');
// moment(this.props.action.date, 'ddd, MMM DD').toString()
import { Segment, Checkbox } from 'semantic-ui-react'

class AppActionsListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment.Group horizontal >
        <Segment textAlign='center' >{date(this.props.action.date)}</Segment>
        <Segment textAlign='center' >
          <Checkbox checked={this.props.action.completed} ></Checkbox>
        </Segment>
        <Segment textAlign='center' >{this.props.action.type}</Segment>
        <Segment textAlign='center' >{this.props.action.contact}</Segment>
      </Segment.Group>
    );
  }
}

export default AppActionsListItem;
