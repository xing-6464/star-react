import React, { useContext, FunctionComponentElement } from 'react'
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
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Waring: SubMenu has a child which is not a MenuItem')
      }
    })

    return (
      <ul className="star-submenu">
        { childrenComponent }
      </ul>
    )
  }
  
  return (
    <ul key={index} className={classes}>
      <div className="submenu-title">
        { title }
      </div>
      { renderChildren() }
    </ul>
  )
}

SubMenu.displayName = 'SubMenu'
