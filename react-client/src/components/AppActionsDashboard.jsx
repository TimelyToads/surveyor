import React from 'react'
import _ from 'lodash'
import axios from 'axios'
import AppActionForm from './AppActionForm.jsx'
import AppActionsListItem from './AppActionsListItem.jsx'
import { Header, Table, Image, Label, Segment, Button, Icon, Modal } from 'semantic-ui-react'

class AppActionsDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actions: props.app.actions.sort( (a, b) => {
        return b.date - a.date;
      }),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(action) {
    var newAction = {
      username: this.props.app.username,
      job_id: this.props.app.id,
      date: action.date,
      type: action.type,
      contact: action.contact,
      completed: action.completed
    };
    axios.post(`/api/users/${this.props.app.username}/jobs/action`, newAction)
    .then(action => {
      var updatedActions = this.state.actions.concat([action.data]).sort( (a, b) => {
        return b.date - a.date;
      });
      this.setState({
        actions: updatedActions
      });
    })
    .catch(err => {
      console.log('ERROR creating new action in DB: ', err);
      alert('Database error! New action was not saved.');
    });
  }

  render() {

    var appActionsList = this.state.actions.map( action => <AppActionsListItem action={action} key={action.id} /> );

    return (

      <Modal trigger={<Button size='mini' >View</Button>}>
        <Modal.Header>
          <Header textAlign='center' color='blue' as='h2' >
            {this.props.app.title} @ {this.props.app.company}
          </Header>
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Job-Seeking Actions</Header>
              <Segment.Group raised >
                <Segment.Group horizontal raised >
                  <Segment inverted color='blue' textAlign='center' size='large' >Due Date</Segment>
                  <Segment inverted color='blue' textAlign='center' size='large' >Finished</Segment>
                  <Segment inverted color='blue' textAlign='center' size='large' >Action</Segment>
                  <Segment inverted color='blue' textAlign='center' size='large' >Contact Info</Segment>
                </Segment.Group>
                {appActionsList}
              </Segment.Group>
              <Segment.Group raised >
                <Segment>
                  <AppActionForm handleSubmit={this.handleSubmit} />
                </Segment>
              </Segment.Group>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' >
            <Icon name='right chevron' />
            {/* TODO: THIS BUTTON CLOSES THE MODAL */}
          </Button>
        </Modal.Actions>
      </Modal>
        
    );
  }
}

export default AppActionsDashboard;
