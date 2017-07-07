import React from 'react';
import { Menu } from 'semantic-ui-react'

let MainMenu = (props) => {
  const { view } = props;

  return (
      <Menu stackable attached inverted>
        <Menu.Item
          name='search'
          active={view === 'start'}
          onClick={props.handleItemClick}
        > Home
        </Menu.Item>
        <Menu.Item
          name='jobs'
          active={view === 'jobs'}
          onClick={props.handleJobsMenuItemClick}
        > Jobs
        </Menu.Item>
        <Menu.Item
          name='resumes'
          active={view === 'resumes'}
          onClick={props.handleItemClick}
        >Applications
        </Menu.Item>
        <Menu.Item
          name='sign-out'
          active={view === 'sign-out'}
          onClick={props.handleItemClick}
        >Sign-out
        </Menu.Item>
      </Menu>
  )
}
export default MainMenu;