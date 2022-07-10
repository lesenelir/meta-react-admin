import {DesktopOutlined, EditOutlined, UserOutlined, LockOutlined} from "@ant-design/icons"
import React from "react"
import logo from "../../assets/images/logo.jpg"
import {Layout, Menu} from "antd"
import {useNavigate} from "react-router-dom"

const {Sider} = Layout


function HomeLeft(props) {
  // 编程式路由导航 配合 Menu4.20.0
  const navigate = useNavigate()

  const items = [
    {
      label: '首页',
      key: 'item1',
      icon: <DesktopOutlined/>,
      children: [
        {
          label: '工作台',
          key: 'item1-sub1',
          onClick() {
            navigate('/')
          }
        }
      ]
    },
    {
      label: '创作中心',
      key: 'item2',
      icon: <EditOutlined/>,
      children: [
        {
          label: '文章列表',
          key: 'item2-sub1',
          onClick() {
            navigate('/list')
          }
        },
        {
          label: '文章编辑',
          key: 'item2-sub2',
          onClick() {
            navigate('/edit')
          }
        }
      ]
    },
    {
      label: '修改资料',
      key: 'item3',
      icon: <UserOutlined/>,
      onClick() {
        console.log(111)
      }
    },
    {
      label: '管理员',
      key: 'item4',
      icon: <LockOutlined/>,
      children: [
        {
          label: '小编名单',
          key: 'item4-sub1',
          onClick() {
            navigate('/namelist')
          }
        }
      ]
    }
  ]

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
          {props.collapsed ? '' : <span style={{fontWeight: 'bold'}}>喵宝宝后台管理系统</span>}
        </div>
        <Menu
            style={{minHeight: '100vh'}}
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
