import React from 'react'
import { Segment } from 'semantic-ui-react'

class AppActionsListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment.Group horizontal >
        <Segment>{this.props.action.date}</Segment>
        <Segment>{this.props.action.completed}</Segment>
        <Segment>{this.props.action.type}</Segment>
        <Segment>{this.props.action.contact}</Segment>
      </Segment.Group>
    );
  }
}

export default AppActionsListItem;
