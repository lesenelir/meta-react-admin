import React from 'react'
import {Modal, Form, Input} from "antd"


// Edit页面提交文章后的弹出组件
function MyModal(props) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields().then(res => {
      // 通知父级修改文章
      console.log(res)
      props.submitArticleEdit(res)
    }).catch(err => {
      console.log(err)
    })

    props.setShowModal(false)
  }

  const handleCancel = () => {
    // setIsModalVisible(false);
    props.setShowModal(false)
  }

  return (
      <div>
        <Modal title="请填写文章标题"
               visible={props.showModal}
               onOk={handleOk}
               onCancel={handleCancel}
               okText="提交"
               cancelText="取消"
        >
          <Form
              form={form}
              name="basic"
              initialValues={{ title: props.title, subTitle: props.subTitle }}
              autoComplete="off"
          >
            <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题'}]}>
              <Input/>
            </Form.Item>
            <Form.Item label="副标题" name="subTitle">
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}

export default MyModal
