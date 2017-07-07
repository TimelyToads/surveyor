import React from 'react'
import _ from 'lodash'
import AppActionForm from './AppActionForm.jsx'
import AppActionsListItem from './AppActionsListItem.jsx'
import data from '../../../database/mockData.js'
import { Header, Table, Image, Label, Segment, Button, Icon, Modal } from 'semantic-ui-react'

class AppActionsDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actions: props.app.actions.sort( (a, b) => {
        return b.date - a.date;
      }),
    };
  }

  render() {

    var appActionsList = this.state.actions.map( (action, i) => <AppActionsListItem action={action} key={i} /> );

    return (

      <Modal trigger={<Button size='mini' >View</Button>}>
        <Modal.Header>
          Profile Picture
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Job-Seeking Actions</Header>
              <Segment.Group>
                {appActionsList}
              </Segment.Group>
              <Segment>
                <AppActionForm />
              </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
        
    );
  }
}

export default AppActionsDashboard;
