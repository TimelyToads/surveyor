import { Label, Image } from 'semantic-ui-react';
import React from 'react';

let Logo = (props) => {

    if (props.jobListItem.jobSourceWebsite === 'Indeed') {
      return (
      <div>
        <Image size='mini' src='images/indeed.com-logo.png' />
      </div>
      )
    } else if (props.jobListItem.jobSourceWebsite === 'Dice') {
      return (
      <div>
        <Image size='mini' src='images/dice_logo.jpg' />
      </div>
      )
    }
  } //end render

export default Logo


//  <Label color="blue" as='a' image>
//           <Image src='images/indeed.com-logo.png' />
//           {props.jobListItem.jobSourceWebsite}
//         </Label>

    // <Label color="red" as='a' image>
    //      
    //       {props.jobListItem.jobSourceWebsite}
    //     </Label>