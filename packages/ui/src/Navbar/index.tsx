'use client'
import React from 'react'
import {AlignJustify} from 'lucide-react'
import { defineHomeGreeting } from '../utils/defineHomeGreeting'

export type DropdownNavbarOptions = {
  name: string
  onClick: () => void
  icon: React.ReactNode
}

interface INavbar {
  navbarTitle: string
  dropdownOptions: DropdownNavbarOptions[]
}

const Navbar = ({ navbarTitle, dropdownOptions }: INavbar) => {
  const homeGreeting = defineHomeGreeting()
  return (
    <div className="navbar bg-white rounded-2xl px-4">
      <div className="flex-1">
        <p className="text-md text-black">
          {navbarTitle} | {homeGreeting} 👋🏼 
        </p>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
          <AlignJustify />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1]  p-2 shadow rounded-box w-52 bg-white mt-4"
        >
          {dropdownOptions.map((option) => (
            <li
              className="flex flex-row items-center gap-2 p-4 hover:bg-gray-50 cursor-pointer"
              onClick={option.onClick}
              key={option.name}
            >
              {option.icon}
              <a>{option.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
