import React from 'react'
import { Checkbox, Form, Input, Select } from 'semantic-ui-react'

const options = [
  { key: 0, text: 'Follow-up Call', value: 'Follow-up Call' },
  { key: 1, text: 'Follow-up Email', value: 'Follow-up Email' },
  { key: 2, text: 'Phone Screen', value: 'Phone Screen' },
  { key: 3, text: 'Phone Interview', value: 'Phone Interview' },
  { key: 4, text: 'Video Conference', value: 'Video Conference' },
  { key: 5, text: 'Onsite Interview', value: 'Onsite Interview' },
  { key: 6, text: 'Job Test', value: 'Job Test' },
  { key: 7, text: 'Informational Interview', value: 'Informational Interview' },
];

class AppActionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      type: '',
      contact: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e, { name, value }) {
    let newActionObj = this.state;
    newActionObj[[name]] = value;
    this.setState(newActionObj);
  }

  handleSubmit(e) {
    var action = {
      date: this.state.date,
      type: this.state.type,
      contact: this.state.contact,
      completed: false
    };
    this.setState({
      date: '',
      type: '',
      contact: ''
    });
    this.props.handleSubmit(action);
  }

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='Due Date' name={'date'} value={this.state.date} onChange={this.handleChange} placeholder={'2001-01-01'} />
          <Form.Select label='Action to Take' name={'type'} value={this.state.type} options={options} onChange={this.handleChange} placeholder='action' />
          <Form.Input label='Contact Info' name={'contact'} value={this.state.contact} onChange={this.handleChange} placeholder='contact info' />
        </Form.Group>
        <Form.Button onClick={this.handleSubmit} fluid color='blue' >Schedule an Action</Form.Button>
      </Form>
    );
  }
}

export default AppActionForm;
