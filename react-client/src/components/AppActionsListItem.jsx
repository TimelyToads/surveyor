import React from 'react'
import axios from 'axios'
import moment from 'moment'
var date = str => moment(str).format('dddd[,] MMM D');
// moment(this.props.action.date, 'ddd, MMM DD').toString()
import { Segment, Checkbox } from 'semantic-ui-react'

class AppActionsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.action.completed
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      completed: !this.state.completed
    });
    var updatedAction = {
      id: this.props.action.id,
      completed: !this.state.completed
    };
    axios.post(`/api/users/${this.props.action.username}/jobs/action`, updatedAction)
    .catch(err => {
      this.setState({
        completed: !this.state.completed
      });
      console.log('ERROR updating existing action in DB: ', err);
      alert('Database error! Action update was not saved.');
    })
  }

  render() {
    return (
      <Segment.Group horizontal >
        <Segment textAlign='center' >{date(this.props.action.date)}</Segment>
        <Segment textAlign='center' >
          <Checkbox checked={this.state.completed} onClick={this.handleClick} ></Checkbox>
        </Segment>
        <Segment textAlign='center' >{this.props.action.type}</Segment>
        <Segment textAlign='center' >{this.props.action.contact}</Segment>
      </Segment.Group>
    );
  }
}

export default AppActionsListItem;
