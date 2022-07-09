import React, {useEffect, useState} from 'react'
import {Breadcrumb, Button, Space, Menu, Dropdown, Layout} from "antd"
import {MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined} from "@ant-design/icons"
import {Outlet} from 'react-router-dom'
import {connect} from "react-redux"

import './HomeRight.css'
import defaultAvatar from '../../assets/images/avatar.jpg'
// 环境变量
import {SERVER_PORT_IMG} from '../../config/index'

const {Header, Content, Footer} = Layout

function HomeRight(props) {
  // console.log(props)
  console.log(process.env)
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('喵宝宝')

  // 组件加载刷新页面才会加载 componentDidMount
  useEffect(() => {
    let avatar = localStorage.getItem('avatar') || defaultAvatar,
        username = localStorage.getItem('username') || '喵宝宝'

    setAvatar(avatar)
    setUsername(username)
  }, [])


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

  const changeUsername = () => {
    // 修改localStorage中的值
    localStorage.setItem('username', 'Jacky3')
    // HomeRight中的Header组件更新
    props.changeKeyFn()
  }

  return (
      <Layout className="site-right">
        {/*头部由左侧button 和 右侧下拉框组成*/}
        {/*右侧 头部 有全局变量key*/}
        <button onClick={changeUsername}>修改username</button>
        <Header key={props.myKey} className="site-right-header">
          <Button
              style={{marginLeft: '12px', marginBottom: 16}}
              onClick={() => props.setCollapsed(!props.collapsed)}
          >
            {props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </Button>
          <Dropdown overlay={menu}>
            <a href="!#" onClick={(e) => e.preventDefault()}>
              <Space>
                <img src={SERVER_PORT_IMG + avatar} alt="" className="site-avatar"/>
                {username}
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

// state映射
const mapStateToProps = (state) => {
  return {
    myKey: state.key
  }
}

// dispatch映射
const mapDispatchToProps = (dispatch) => {
  return {
    changeKeyFn() {
      dispatch({type: 'changeKey'})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeRight)

// export default HomeRight
