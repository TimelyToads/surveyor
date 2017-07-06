import { Label, Image } from 'semantic-ui-react';
import React from 'react';

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.jobListItem.jobSourceWebsite === 'Indeed') {
      return (
      <div>
        <Label color="blue" as='a' image>
          <Image src='images/indeed.com-logo.png' />
          {this.props.jobListItem.jobSourceWebsite}
        </Label>
      </div>
      )
    } else if (this.props.jobListItem.jobSourceWebsite === 'Dice') {
      return (
      <div>
        <Label color="red" as='a' image>
          <Image src='images/dice_logo.jpg' />
          {this.props.jobListItem.jobSourceWebsite}
        </Label>
      </div>
      )
    }
  } //end render
}
export default Logo


  // } else if (props.jobListItem.jobSourceWebsite  === 'Dice') {
  //   return (
  //       <Label color="red" as='a' image>
  //       <Image src='images/dice_logo.png' />
  //       {this.props.jobListItem.jobSourceWebsite}
  //     </Label>
  //   )
  // }