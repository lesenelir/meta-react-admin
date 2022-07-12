import React, {useEffect, useState} from 'react'
import {PageHeader, Button} from "antd"

import E from 'wangeditor'
import {useLocation} from "react-router-dom"
import {ArrowLeftOutlined} from "@ant-design/icons";
import moment from "moment"
import MyModal from "../MyModal/MyModal"

let editor = null
function Editor() {
  const [content, setContent] = useState('')
  const location = useLocation()
  // 控制modal显示隐藏控制
  const [showModal, setShowModal] = useState(false)

  // 依赖项为[]，不依赖数据的更新只执行一次，相当于componentDidMount
  useEffect(() => {
    editor = new E('#myEditor')

    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }

    editor.create()

    return () => { // 清除副作用，componentWillUnmount
      editor.destroy()
    }
  }, [])

  return (
      <div className="editor">
        {/*页头*/}
        <PageHeader
            style={{padding: 0, marginBottom: '20px'}}
            ghost={false}
            backIcon={location.pathname === '/edit' ? false: <ArrowLeftOutlined />}
            onBack={() => null}
            title="文章编辑"
            subTitle={`当前日期: ${moment().format('YYYY-MM-DD')}`}
            extra={[
                <Button key="3" onClick={() => setShowModal(true)} >提交文章</Button>
            ]}
        />
        <div id="myEditor"/>
        <MyModal showModal={showModal} setShowModal={setShowModal} />
      </div>
  )
}

export default Editor
