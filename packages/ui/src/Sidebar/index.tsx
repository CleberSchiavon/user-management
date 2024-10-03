import { ReactElement } from 'react'
import MenuItem, { MenuItemType } from '../MenuItem'
interface ISidebar {
  items: MenuItemType[]
  sidebarLogo: ReactElement
}

const Sidebar = ({ items, sidebarLogo }: ISidebar) => {
  const SidebarLogo = sidebarLogo
  return (
    <div className="sticky top-10 p-6">
      <div className="flex justify-center">{SidebarLogo}</div>
      <div className="divider"></div>
      <ul className="list-none my-6 flex flex-col">
        {items.map((item) => (
          <MenuItem item={item} key={item.title} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
