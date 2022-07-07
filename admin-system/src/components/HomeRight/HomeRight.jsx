import React from 'react'
import {Breadcrumb, Button, Layout} from "antd"
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons"

const {Header, Content, Footer} = Layout

function HomeRight(props) {

  return (
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0, backgroundColor: '#fff'}}>
          <Button
              style={{marginLeft: '12px', marginBottom: 16}}
              onClick={() => props.setCollapsed(!props.collapsed)}
          >
            {props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </Button>

        </Header>

        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            Bill is a cat.
          </div>
        </Content>

        <Footer style={{textAlign: 'center'}}>
          react-admin-system ©2022 created by Lesenelir
        </Footer>
      </Layout>
  )
}

export default HomeRight
