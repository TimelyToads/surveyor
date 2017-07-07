import React from 'react';
import { Menu } from 'semantic-ui-react'

let MainMenu = (props) => {
  const { view } = props;


  return (
      <Menu stackable attached inverted>
        <Menu.Item
          name='search'
          active={view === 'start'}
          onClick={() => {props.handleItemClick('start')}}
        > Home
        </Menu.Item>
        <Menu.Item
          name='jobs'
          active={view === 'jobs'}
          onClick={() => {props.handleItemClick('jobs')}}
        > Jobs
        </Menu.Item>
        <Menu.Item
          name='apps'
          active={view === 'apps'}
          onClick={() => {props.handleItemClick('apps')}}
        >Applications
        </Menu.Item>
        <Menu.Item
          name='sign-out'
          active={view === 'sign-out'}
          onClick={() => {props.handleItemClick('sign-out')}}
        >Sign Out
        </Menu.Item>
      </Menu>
  )
}
export default MainMenu;