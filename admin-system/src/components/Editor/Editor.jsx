import React, {useEffect, useState} from 'react'
import {PageHeader, Button} from "antd"

import E from 'wangeditor'

let editor = null
function Editor(props) {

  const [content, setContent] = useState('')

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
            title="文章编辑"
            subTitle={`当前日期: ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`}
            extra={[
                <Button key="3">提交文章</Button>
            ]}
        />
        <div id="myEditor"/>
      </div>
  )
}

export default Editor
