import React, {useContext, useEffect, useState} from 'react'
import {Breadcrumb, Button, Space, Menu, Dropdown, Layout, message} from "antd"
import {MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined} from "@ant-design/icons"
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'

import './HomeRight.css'
import KeyContext from "../../context/context"
import defaultAvatar from '../../assets/images/avatar.jpg'
// 环境变量
import {SERVER_PORT} from "../../config"
import DashBoard from "../DashBoard/DashBoard"

const {Header, Content, Footer} = Layout


function HomeRight(props) {
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('喵宝宝')
  const [bread, setBread] = useState('')
  const navigate = useNavigate()
  const contextData = useContext(KeyContext) // key changeKeyFn
  const location = useLocation()
  // console.log(location)

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

  // 组件加载刷新页面才会加载 componentDidMount
  useEffect(() => {
    let avatar = localStorage.getItem('avatar') || defaultAvatar,
        username = localStorage.getItem('username') || '喵宝宝'

    setAvatar(avatar)
    setUsername(username)
  }, [])

  // 检测contextData.key的变化，如果有变化，则调用该hook
  useEffect(() => {
    let username = localStorage.getItem('username'),
        avatar = localStorage.getItem('avatar')
    setUsername(username)
    setAvatar(avatar)
  }, [contextData.key])

  // 面包屑匹配规则
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setBread('')
        break
      case '/crypto':
        setBread('加密货币')
        break
      case '/list':
        setBread('文章列表')
        break
      case '/edit':
        setBread('文章编辑')
        break
      case '/profile':
        setBread('修改资料')
        break
      case '/namelist':
        setBread('小编名单')
        break
      case '/error/403':
        setBread('403页面')
        break
      case '/error/404':
        setBread('404页面')
        break
      case '/error/500':
        setBread('500页面')
        break
      default:
        setBread('')
        break
    }
  }, [location.pathname])


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
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            {/*忽略首页的/ 此处做特殊处理*/}
            {
              bread === ''
                  ? ''
                  : <Breadcrumb.Item><Link to={location.pathname}>{bread}</Link></Breadcrumb.Item>
            }
          </Breadcrumb>

          <div className="site-right-content" style={{padding: 24, minHeight: 360}}>
            {/*<Outlet/>*/}
            {
              location.pathname === '/' ? <DashBoard/> : <Outlet/>

            }
          </div>
        </Content>

        <Footer style={{textAlign: 'center'}}>
          react-admin-system ©2022 created by Lesenelir
        </Footer>
      </Layout>
  )
}

export default HomeRight
