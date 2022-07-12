import React from 'react'
import {Modal, Form, Input} from "antd"

function MyModal(props) {

  const handleOk = () => {
    // setIsModalVisible(false);
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
              name="basic"
              initialValues={{remember: true}}
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
