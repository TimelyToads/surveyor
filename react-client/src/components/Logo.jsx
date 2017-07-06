import { Label, Image } from 'semantic-ui-react'

function Logo(props) {

  if (props.jobListItem.jobSourceWebsite === 'Indeed') {
    return (
      <Label color="blue" as='a' image>
        <Image src='images/indeed.com-logo.png' />
        {props.jobListItem.jobSourceWebsite}
      </Label>
    )
  } else if (props.source === 'Dice') {
    return (
        <Label color="red" as='a' image>
        <Image src='images/dice_logo.png' />
        {this.props.jobListItem.jobSourceWebsite}
      </Label>
    )
  }
  	
}
export default Logo;