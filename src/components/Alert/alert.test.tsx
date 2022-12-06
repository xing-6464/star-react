import React from 'react'
import { render, screen,  } from '@testing-library/react'
import Alert, { AlertProps, AlertType } from './alert'


const testProps: AlertProps = {
  title: 'title',
  onClose: jest.fn()
}
describe('test component alert', () => {
  it('should render the correct default alert', () => {
    render(<Alert {...testProps} />)
    const element = screen.queryByText('title')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('star-alert-title')
  })

  it('should render click hide', () => {

  })
})