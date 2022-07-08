import React from "react"
import {Button, Form, Input, message} from "antd"
import {Link, useNavigate} from "react-router-dom"

import {RegisterApi} from "../../request/api"
import './Register.css'


function Register(props) {
  const navigate = useNavigate()

  // 点击注册后的回调函数
  const onFinish = (values) => {
    // 获取用户名和密码
    let {username, password, confirmPassword} = values

    if (password !== confirmPassword) {
      message.error('请输入相同的密码')
      return
    }
    // 注册
    // res - {errCode: 0, message: '注册成功', data: '注册成功'}
    RegisterApi({username, password}).then(res => {
      if (res.errCode === 0) {
        message.success(res.message, 1.5)
        // 跳转页面
        setTimeout(() => {
          navigate('/login')
        })
      }
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }


  return (
      <div className="register-box">
        <div className="form-register-box">
          <Form name="register-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <p>Register</p>

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

            <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: '密码不一致',
                  },
                ]}
            >
              <Input.Password placeholder="请确认密码" />
            </Form.Item>

            <Form.Item className="form-item-link">
              <Link to="/login">已有账号？立即登录</Link>
            </Form.Item>

            <Form.Item className="form-item-btn">
              <Button className="btn" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )
}

export default Register
