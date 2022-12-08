import React from 'react'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'

import {  Menu, MenuProps } from './menu'
import { MenuItem } from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        index2
      </MenuItem>
    </Menu>
  )
}
let menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
const setup = (props: MenuProps) => {
  render(generateMenu(props)) as RenderResult
  menuElement = screen.getByTestId('test-menu')
  activeElement = screen.getByText('active')
  disabledElement = screen.getByText('disabled')
}
describe('tset Menu and MenuItem component', () => {
  it('should render correct Menu and MenuItem based on default props', () => {
    setup(testProps)
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('star-menu test')
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    setup(testProps)
    const thirdItem = screen.getByText('index2')

    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('menu-item is-active')
    expect(menuElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when mode is set to vertical', () => {
    setup(testVerProps)
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
