import React, {useContext, useEffect, useState} from 'react'
import {Breadcrumb, Button, Space, Menu, Dropdown, Layout, message} from "antd"
import {MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined} from "@ant-design/icons"
import {Outlet, useNavigate} from 'react-router-dom'

import './HomeRight.css'
import KeyContext from "../../context/context"
import defaultAvatar from '../../assets/images/avatar.jpg'
// 环境变量
// import {SERVER_PORT_IMG} from '../../config/index'
import {SERVER_PORT} from "../../config"

const {Header, Content, Footer} = Layout


function HomeRight(props) {
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('喵宝宝')
  const navigate = useNavigate()
  const contextData = useContext(KeyContext) // key changeKeyFn
  console.log(contextData)

  // 组件加载刷新页面才会加载 componentDidMount
  useEffect(() => {
    let avatar = localStorage.getItem('avatar') || defaultAvatar,
        username = localStorage.getItem('username') || '喵宝宝'

    setAvatar(avatar)
    setUsername(username)
  }, [])

  // 检测contextData.key的变化，如果有变化，则调用该hook
  useEffect(() => {
    // console.log('ooooooooooo')
    let username = localStorage.getItem('username'),
        avatar = localStorage.getItem('avatar')
    setUsername(username)
    setAvatar(avatar)
  }, [contextData.key])

  // 修改资料点击
  const clickProfile = () => {
    let token = localStorage.getItem('token')
    if (token) {
      navigate('/profile')
    } else {
      message.warning('登录信息失效，请重新登录', 1.5)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }

  // 退出登录
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    localStorage.removeItem('role')
    localStorage.removeItem('editable')
    message.success('退出成功', 1.5)
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }


  const menu = (
      <Menu
          items={[
            {
              key: '1',
              label: ('修改资料'),
              onClick: () => clickProfile()
            },
            {
              type: 'divider',
            },
            {
              key: '2',
              label: ('退出登录'),
              onClick: () => logout()
            }
          ]}
      />
  )

  return (
      <Layout className="site-right">
        {/*头部由左侧button 和 右侧下拉框组成*/}
        {/*右侧 头部 有全局变量key*/}
        <Header key={contextData.key} className="site-right-header">
          <Button
              style={{marginLeft: '12px', marginBottom: 16}}
              onClick={() => props.setCollapsed(!props.collapsed)}
          >
            {props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </Button>
          <Dropdown overlay={menu}>
            <a href="!#" onClick={(e) => e.preventDefault()}>
              <Space>
                <img src={SERVER_PORT + '/' + avatar} alt="" className="site-avatar"/>
                {username}
                <DownOutlined/>
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
