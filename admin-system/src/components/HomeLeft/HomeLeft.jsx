import {
  DesktopOutlined,
  EditOutlined,
  UserOutlined,
  LockOutlined,
  ApiOutlined,
  LinkOutlined
} from "@ant-design/icons"
import React, {useEffect, useState} from "react"
import logo from "../../assets/images/logo.jpg"
import {Layout, Menu} from "antd"
import {useNavigate, useLocation} from "react-router-dom"

const {Sider} = Layout


function HomeLeft(props) {
  // 编程式路由导航 配合 Menu4.20.0
  const navigate = useNavigate()
  const [asideKey, setASideKey] = useState('0')
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    localStorage.getItem('role') === 'vip'
        ? setFlag(false)
        : setFlag(true)
  }, [])

  const items = [
    {
      label: '首页',
      key: '1',
      icon: <DesktopOutlined/>,
      children: [
        {
          label: '工作台',
          key: '1-1',
          onClick() {
            navigate('/')
          }
        }
      ]
    },
    {
      label: '创作中心',
      key: '2',
      icon: <EditOutlined/>,
      children: [
        {
          label: '文章列表',
          key: '2-1',
          onClick() {
            navigate('/list')
          }
        },
        {
          label: '文章编辑',
          key: '2-2',
          onClick() {
            navigate('/edit')
          }
        }
      ]
    },
    {
      label: '错误页面',
      key: 3,
      icon: <ApiOutlined />,
      children: [
        {
          label: '403',
          key: '3-1',
          onClick() {
            navigate('/error/403')
          }
        },
        {
          label: '404',
          key: '3-2',
          onClick() {
            navigate('/error/404')
          }
        },
        {
          label: '500',
          key: '3-3',
          onClick() {
            navigate('/error/500')
          }
        }
      ]
    },
    {
      label: '外链',
      key: '4',
      icon: <LinkOutlined />,
      children: [
        {
          label: 'Github',
          key: '4-1',
          onClick() {
            window.open('https://github.com/lesenelir/meta-react-admin')
          }
        }
      ]
    },
    {
      label: '修改资料',
      key: '5',
      icon: <UserOutlined/>,
      onClick() {
        navigate('/profile')
      }
    },
    {
      label: '管理员',
      key: '6',
      icon: <LockOutlined/>,
      children: [
        {
          label: '小编名单',
          key: '6-1',
          onClick() {
            navigate('/namelist')
          }
        }
      ],
      disabled: flag
    }
  ]

  // 获取当前的路由
  const location = useLocation()

  // 监听路由（数据）变化，修改侧边栏当前项
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setASideKey('1-1')
        break
      case '/list':
        setASideKey('2-1')
        break
      case '/edit':
        setASideKey('2-2')
        break
      case '/error/403':
        setASideKey('3-1')
        break
      case '/error/404':
        setASideKey('3-2')
        break
      case '/error/500':
        setASideKey('3-3')
        break
      case '/profile':
        setASideKey('5')
        break
      case '/namelist':
        setASideKey('6-1')
        break
      default:
        setASideKey('1-1')
        break
    }
    if (location.pathname.includes('/edit')) {
      setASideKey('2-2')
    }
  }, [location.pathname])

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
            defaultOpenKeys={['1', '2']}
            defaultSelectedKeys={['1-1']}
            selectedKeys={[asideKey]}
            mode="inline"
            items={items}
        />
      </Sider>
  )
}

export default HomeLeft
