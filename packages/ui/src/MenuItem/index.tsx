'use client'
import React, { useEffect, useState } from 'react'

interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode
  size?: string | number
  color?: string
  title?: string
}
type IconType = (props: IconBaseProps) => JSX.Element

export interface MenuItemType {
  title: string
  route: string
  icon: IconType
}

const MenuItem = ({ item }: { item: MenuItemType }) => {
  const [isActiveItem, setIsActiveItem] = useState(false)

  useEffect(() => {
    const isActive = item.route === window.location.pathname
    setIsActiveItem(isActive)
  })

  const MenuIcon = item.icon
  return (
    <a
      href={item.route}
      className={`flex items-center gap-2 p-4 justify-between container hover:bg-gray-100`}
    >
      <div className="flex flex-row gap-2">
        <MenuIcon color={`${isActiveItem ? '#2B3674' : 'gray'}`} size={25} />
        <p
          className={` text-md ${isActiveItem ? 'font-bold text-blue-700' : 'font-semibold text-gray-600'}`}
        >
          {item.title}
        </p>
      </div>
    </a>
  )
}

export default MenuItem
