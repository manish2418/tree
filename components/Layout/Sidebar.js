import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Image, Layout } from 'antd'
const { Sider } = Layout
import SideBarLogo from '../../public/Assests/SideBar/sidebarLogo.png'
import DashboardLogo from '../../public/Assests/SideBar/DashboardLogo.svg'
import EmployeeLogo from '../../public/Assests/SideBar/EmployeeLogo.svg'
import PayslipsLogo from '../../public/Assests/SideBar/PayslipsLogo.svg'
import LeavesLogo from '../../public/Assests/SideBar/LeavesLogo.svg'
import AppraisalLogo from '../../public/Assests/SideBar/AppraisalLogo.png'
import ClaimsLogo from '../../public/Assests/SideBar/ClaimsLogo.png'

const Sidebar = () => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  if (router.pathname === '/login') {
    return null
  }

  const subMenuItems = [
    {
      key: 'item1',
      label: 'Dashboard',
      icon: <Image src={DashboardLogo.src} preview={false} alt='logo' />,
      onClick: () => router.push('/dashboard'),
    },
    {
      key: 'item2',
      label: 'Employee',
      icon: <Image src={EmployeeLogo.src} preview={false} alt='logo' />,
      onClick: () => router.push('/employee'),
    },

    {
      key: 'item3',
      label: 'Payslips',
      icon: <Image src={PayslipsLogo.src} preview={false} alt='logo' />,
      onClick: () => router.push('/payslips'),
    },
    {
      key: 'item4',
      label: 'Leaves',
      icon: <Image src={LeavesLogo.src} preview={false} alt='logo' />,
      onClick: () => router.push('/leaves'),
    },
    {
      key: 'item5',
      label: 'Appraisal',
      icon: <Image src={AppraisalLogo.src} preview={false} alt='logo' />,
      onClick: () => router.push('/appraisal'),
    },
    {
      key: 'item6',
      label: 'Claims',
      icon: <Image src={ClaimsLogo.src} preview={false} alt='logo' />,
      onClick: () => router.push('/claims'),
    },
  ]
  return (
    <div className='sidebar'>
      <Sider
        // collapsible
        breakpoint='lg'
        collapsedWidth='0'
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className='admin-dashboard-sidebar'
      >
        <div className='side-bar-head'>
          <Image src={SideBarLogo.src} preview={false} />
          <span>TreeDigit</span>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          className='menu-list'
          items={subMenuItems}
        ></Menu>
      </Sider>
    </div>
  )
}

export default Sidebar
