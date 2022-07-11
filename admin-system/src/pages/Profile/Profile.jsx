import React, {useContext, useState} from 'react'
import {Button, Form, Input, message, Upload} from "antd"

import KeyContext from "../../context/context"

import './Profile.css'
import {changeUserInfoApi} from "../../request/api"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";


function Profile() {
  const [loading, setLoading] = useState(false)
  const [imageUrl] = useState()
  const contextData = useContext(KeyContext) // key changeKeyFn

  // 表单提交响应函数
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
        // 更新Header组件，context
        contextData.changeKeyFn()
      }
      if (res.errCode === 1) {
        message.error('用户名已存在')
      }
    })
  }

  // 限制图片上传的格式和大小
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('仅支持上传JPG/PNG格式的图片！')
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('图片尺寸大于1MB！')
    }

    return isJpgOrPng && isLt1M
  }


  // 上传图片文件后调用
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      if (info.file.response.errCode === 0) {
        message.success('头像修改成功')
        //
        localStorage.setItem('avatar', info.file.response.data.avatar)
        // 利用context更新Header组件
        contextData.changeKeyFn()
      }
      setLoading(false)
    }
  }

  // 上传按钮JSX元素
  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}> Upload </div>
      </div>
  )

  return (
      <div className="profile-box">

        <Form className="profile-form-box" onFinish={onFinish} >
          <p>修改用户信息</p>
          {/*表单元素*/}
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

        {/* 上传头像图片元素 */}
        <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="http://localhost:9000/manage/upload"
            headers={{authorization: localStorage.getItem('token')}}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
          {
            imageUrl
                ? (<img src={imageUrl} alt="avatar" style={{width: '100%'}} />)
                : uploadButton
          }
        </Upload>

      </div>
  )
}


export default Profile
