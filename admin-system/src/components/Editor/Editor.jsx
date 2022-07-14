import React, {useEffect, useState} from 'react'
import {PageHeader, Button, message} from "antd"

import E from 'wangeditor'
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {ArrowLeftOutlined} from "@ant-design/icons"
import moment from "moment"
import MyModal from "../MyModal/MyModal"
import {AddArticleApi, EditArticleApi, GetArticleByIdApi} from "../../request/api"

let editor = null
function Editor() {
  const location = useLocation()
  const navigate = useNavigate()
  const {id} = useParams()
  const [content, setContent] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [modalSubTitle, setModalSubTitle] = useState('')
  // 控制modal显示隐藏控制
  const [showModal, setShowModal] = useState(false)


  // 依赖项为[]，不依赖数据的更新只执行一次，相当于componentDidMount
  useEffect(() => {
    // 实例化富文本编辑器
    editor = new E('#myEditor')
    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()

    // 获取地址栏id
    if (id) {
      // id存在，代表编辑文章
      GetArticleByIdApi({id}).then(res => {
        console.log(res)
        if (res.errCode === 0) {
          message.success(res.message)
          editor.txt.html(res.data.content)
          setModalTitle(res.data.title)
          setModalSubTitle(res.data.subTitle)
        } else {
          message.error(res.message)
        }
      })
    } else {
      // id不存在，代表要添加文章
    }

    return () => { // 清除副作用，componentWillUnmount
      editor.destroy()
    }
    // BUG -> 此处id是否要为依赖项
    // eslint-disable-next-line
  }, [])

  // 模态框点击提交，触发ajax请求
  const submitArticleEdit = (value) => {
    console.log(value)
    // 有id调用编辑的接口
    if (id) {
      EditArticleApi({
        title: value.title,
        subTitle: value.subTitle,
        content: content,
        id: id
      }).then(res => {
        if (res.errCode === 0) {
          message.success(res.message)
          setTimeout(() => {
            navigate('/list')
          }, 1)
        }
      })
    } else {
      // 没有id调用添加的接口
      AddArticleApi({
        ...value,
        content
      }).then(res => {
        if (res.errCode === 0) {
          message.success(res.message)
          setTimeout(() => {
            navigate('/list')
          },1)
        }
      })
    }

  }

  return (
      <div className="editor">
        {/*页头*/}
        <PageHeader
            style={{padding: 0, marginBottom: '20px'}}
            ghost={false}
            backIcon={location.pathname === '/edit' ? false: <ArrowLeftOutlined />}
            onBack={() => navigate('/list')}
            title="文章编辑"
            subTitle={`当前日期: ${moment().format('YYYY-MM-DD')}`}
            extra={[
                <Button key="3" onClick={() => setShowModal(true)} >提交文章</Button>
            ]}
        />
        <div id="myEditor"/>
        <MyModal
            showModal={showModal}
            setShowModal={setShowModal}
            title={modalTitle}
            subTitle={modalSubTitle}
            submitArticleEdit={submitArticleEdit}
        />
      </div>
  )
}

export default Editor
