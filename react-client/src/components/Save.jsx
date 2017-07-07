import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Save extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="login">
        <span className="another">or drop another resume</span>
      </div>
    )
  }
}

export default Save;