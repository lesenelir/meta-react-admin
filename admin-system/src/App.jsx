import {
  DesktopOutlined,
  UserOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, Button } from 'antd'

import React, {useState} from "react"
// import {Outlet} from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout


function getItem(label, key, icon, children) { // 根据传入参数返回一个对象
  return {
    key,
    icon,
    children,
    label
  }
}

const items = [
  getItem('首页', 'item1', <DesktopOutlined />, [
      getItem('工作台', 'item1-sub1')
  ]),
  getItem('创意设计', 'item2', <EditOutlined />, [
      getItem('文章列表', 'item2-sub1'),
      getItem('富文本编辑器', 'item2-sub2')
  ]),
  getItem('修改资料', 'item3', <UserOutlined />),
]


// 后台页面
//
function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
      <Layout style={{ minHeight: '100vh' }}>
        {/*左侧边栏*/}
        <Sider
            breakpoint="lg"
            collapsed={collapsed}
        >
          <div className="logo" />
          <Menu
              style={{ minHeight: '100vh' }}
              theme="light"
              defaultOpenKeys={['item1']}
              defaultSelectedKeys={['item1-sub1']}
              mode="inline"
              items={items}
          />
        </Sider>

        {/*对右侧进行布局*/}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#fff' }}  >
            <Button
                style={{ marginLeft: '12px',marginBottom: 16 }}
                onClick={() => setCollapsed(!collapsed)}
            >
              { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
            </Button>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            react-admin-system ©2022 created by Lesenelir
          </Footer>
        </Layout>

      </Layout>
  )
}

// <Outlet/>
export default App
