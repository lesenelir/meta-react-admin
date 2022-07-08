import React from "react"
import {Link} from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'

import './Login.css'

function Login(props) {

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }


  return (
      <div className="login-box">
        <div className="form-box">
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

              <Form.Item className="Item">
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







      // <div className="login-box">
      //   <form action="" className="login">
      //     <p>Login</p>
      //     <input type="text" placeholder="用户名" />
      //     <input type="password" placeholder="密码" />
      //     {/*<input type="radio" />记住我*/}
      //     {/*<span><a href="!#">忘记密码</a></span>*/}
      //     <input type="submit" className="btn" style={{marginRight: '60px'}} value="注 册" />
      //     <input type="submit" className="btn" value="登 录" />
      //   </form>
      // </div>
  )
}

export default Login
