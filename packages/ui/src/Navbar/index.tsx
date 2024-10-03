import React, { ReactElement } from 'react'

export type DropdownNavbarOptions = {
  name: string
  onClick: () => void
  icon: ReactElement
}

interface INavbar {
  navbarTitle: string
  optionsLogo: ReactElement
  dropdownOptions: DropdownNavbarOptions[]
}

const Navbar = ({ navbarTitle, optionsLogo, dropdownOptions }: INavbar) => {
  const OptionsLogo = optionsLogo
  return (
    <div className="navbar bg-white rounded-2xl px-4">
      <div className="flex-1">
        <p className="text-md text-black">
          {navbarTitle} 👋🏼
        </p>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
          {OptionsLogo}
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
