import React from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import GoogleAuth from './GoogleAuth.jsx';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: true,
      closeOnEscape: false,
      closeOnRootNodeClick: false
    }
  }
  
  close () {
    this.setState({ open: false })
  }

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state

    return (
      <div>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnRootNodeClick={closeOnRootNodeClick}
          onClose={this.close}
          basic size='small'
        >
          <Header icon='laptop' content='Sign-in to TechHub' />
           <Modal.Content>
            <p>In order to upload your resume, please login or sign-up.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
              
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default LoginModal