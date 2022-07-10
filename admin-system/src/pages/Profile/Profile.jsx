import React, {useEffect} from 'react'
import {Button, Form, Input, message} from "antd";
import {connect} from "react-redux"

import './Profile.css'
import {changeUserInfoApi} from "../../request/api";

function Profile(props) {

  const onFinish = (values) => {
    // 调接口，修改用户名和密码
    changeUserInfoApi({
      username: values.username || '',
      password: values.password || ''
    }).then(res => {
      console.log(res.data)
      if (res.errCode === 0) {
        message.success(res.message)
        const {avatar, username, token} = res.data
        // 存储用户信息
        localStorage.setItem('avatar', avatar)
        localStorage.setItem('username', username)
        localStorage.setItem('token', token)
        // 更新Header组件，react-redux
        props.changeKeyFn()
      }
    })
  }

  return (
      <div className="profile-box">

        <Form className="profile-form-box" onFinish={onFinish} >
          <p>修改用户信息</p>
          <Form.Item name="username" label="用户名">
            <Input placeholder='请输入用户名'/>
          </Form.Item>

          <Form.Item name="password" label="密　码">
            <Input.Password placeholder="请输入密码"/>
          </Form.Item>

          <Form.Item name="input">
            <Button className="btn" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>

      </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeKeyFn() {
      dispatch({type: 'changeKey'})
    }
  }
}

export default connect(null, mapDispatchToProps)(Profile)

// export default Profile
