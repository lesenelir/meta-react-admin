import React from 'react'

import {SyncOutlined} from '@ant-design/icons'
import './Loading.css'

function Loading(props) {
  return (
      <div className={"loading-box"}>
        <SyncOutlined spin style={{fontSize: '80px'}} />
      </div>
  )
}

export default Loading
