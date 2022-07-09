import React from "react"
import {Link, useNavigate} from 'react-router-dom'
import { Button, Checkbox, Form, Input, message } from 'antd'

import {LoginApi} from "../../request/api"
import './Login.css'

function Login(props) {

  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values)

    let {username, password} = values


    // res: {errCode: 0, message: '登录成功', data: {…}}
    // data: [avatar: , manageToken, username]
    LoginApi({username, password}).then((res) => {
      console.log('11111111', res)

      // 登录成功
      if (res.errCode === 0) {
        message.success(res.message, 1.5)

        // 保存用户信息和token
        // 将token保存到localStorage 和 react-redux
        localStorage.setItem('username', res.data[0].username)
        // localStorage.setItem('manageToken', res.data[0].token)
        localStorage.setItem('token', res.data[0].token)
        localStorage.setItem('avatar', res.data[0].avatar) // 环境变量

        // 跳转页面
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }

      // 登录失败，没有用户名
      if (res.errCode === 2) {
        message.error('用户不存在，请先注册', 1.5)
      }

      // 登录失败，用户名或密码错误
      if (res.errCode === 1) {
        message.error('用户名或密码错误', 1.5)
      }

    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
      <div className="login-box">
        <div className="form-login-box">
          <Form name="login-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <p>Login</p>

            <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '账号或邮箱必须输入',
                  },
                ]}
            >
              <Input placeholder="请输入账号或邮箱" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '密码必须输入',
                  },
                ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            {/*水平布局*/}
            <div className="form-information">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Form.Item>
                <Link to="/register">还没账号？立即注册</Link>
              </Form.Item>
            </div>

            <Form.Item className="form-item-btn">
              <Button className="btn" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )
}

export default Login
