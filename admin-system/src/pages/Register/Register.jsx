import React from "react"

import {Button, Form, Input} from "antd"
import {Link} from "react-router-dom"

import './Register.css'


function Register(props) {

  const onFinish = (values) => {
    console.log('Success:', values)
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
