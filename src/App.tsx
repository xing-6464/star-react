import React from 'react'
import './App.css'
import {
  Menu,
  MenuItem,
  SubMenu
} from './components/Menu'

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Menu defaultIndex={0} onSelect={(index) => {alert(index)}} mode='vertical'>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1} disabled>
            cool link1
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
            <MenuItem>
              dropdown 3
            </MenuItem>
          </SubMenu>
          <MenuItem index={2}>
            cool link2
          </MenuItem>
        </Menu>
      </header>
    </div>
  )
}

export default App
