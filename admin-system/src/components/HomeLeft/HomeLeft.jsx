import {DesktopOutlined, EditOutlined, UserOutlined} from "@ant-design/icons"
import React from "react"
import logo from "../../assets/images/logo.jpg"
import {Layout, Menu} from "antd"

const { Sider } = Layout

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
    getItem('文章编辑', 'item2-sub2'),
    getItem('富文本编辑器', 'item2-sub3')
  ]),
  getItem('修改资料', 'item3', <UserOutlined />),
]


function HomeLeft(props) {

  return (
      <Sider
          width="250px"
          theme="light"
          breakpoint="lg"
          collapsed={props.collapsed}
      >
        {/*<div className="logo" />*/}
        <div>
          <img src={logo} width="80px" alt=""/>
          { props.collapsed ? '' : <span style={{ fontWeight: 'bold' }}>喵宝宝后台管理系统</span> }
        </div>
        <Menu
            style={{ minHeight: '100vh'}}
            theme="light"
            defaultOpenKeys={['item1']}
            defaultSelectedKeys={['item1-sub1']}
            mode="inline"
            items={items}
        />
      </Sider>
  )
}

export default HomeLeft
