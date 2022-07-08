import React from 'react'
import {Breadcrumb, Button, Space, Menu, Dropdown, Layout} from "antd"
import {MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined} from "@ant-design/icons"
import {Outlet} from 'react-router-dom'

import './HomeRight.css'
import avatar from '../../assets/images/avatar.jpg'

const {Header, Content, Footer} = Layout

function HomeRight(props) {

  const menu = (
      <Menu
          items={[
            {
              key: '1',
              label: ( '修改资料'),
            },
            {
              type: 'divider',
            },
            {
              key: '2',
              label: ( '退出登录'),
            }
          ]}
      />
  )

  return (
      <Layout className="site-right">
        {/*头部由左侧button 和 右侧下拉框组成*/}
        <Header className="site-right-header">
          <Button
              style={{marginLeft: '12px', marginBottom: 16}}
              onClick={() => props.setCollapsed(!props.collapsed)}
          >
            {props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </Button>
          <Dropdown overlay={menu}>
            <a href="!#" onClick={(e) => e.preventDefault()}>
              <Space>
                <img src={avatar} alt="" className="site-avatar"/>
                喵宝宝
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        {/*内容区由面包屑 和 内容区组成*/}
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-right-content" style={{padding: 24, minHeight: 360}}>
            <Outlet/>
          </div>
        </Content>

        <Footer style={{textAlign: 'center'}}>
          react-admin-system ©2022 created by Lesenelir
        </Footer>
      </Layout>
  )
}

export default HomeRight
