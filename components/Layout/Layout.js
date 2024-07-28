import { Layout, Menu, theme } from 'antd'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'

const { Header, Content, Footer, Sider } = Layout

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content>
          <div
            style={
              {
                // padding: 24 ,
                // minHeight: 360,
                // background: '#ffffff',
              }
            }
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
