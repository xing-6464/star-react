import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: number
  title: string
  className?: string
  children?: React.ReactNode
}

export const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const [ menuOpen, setOpen ] = useState(false)
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('star-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Waring: SubMenu has a child which is not a MenuItem')
      }
    })

    return (
      <ul className={subMenuClasses}>
        { childrenComponent }
      </ul>
    )
  }
  
  return (
    <ul key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        { title }
      </div>
      { renderChildren() }
    </ul>
  )
}

SubMenu.displayName = 'SubMenu'
