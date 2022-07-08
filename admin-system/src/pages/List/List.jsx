import React from "react"
import {Button, Table} from "antd"

import './List.css'

// 按钮组件
function OperationButton(props) {
  return (
      <>
        <Button shape="round" style={{marginRight: '12px'}}>编辑</Button>
        <Button shape="round" danger>删除</Button>
      </>
  )
}

// 标题组件
function TitleComp(props) {
  return (
      <>
        <div>
          <a href="!#">主标题</a>
        </div>
        <p style={{color: '#A9A9A9'}}>副标题副标题副标题副标题</p>
      </>
  )
}


const dataSource = [
  {
    key: '1',
    title: <TitleComp/>,
    time: '2012-03-03',
    operation: <OperationButton/>
  },
  {
    key: '2',
    title: <TitleComp/>,
    time: '2022-03-03',
    operation: <OperationButton/>
  }
]

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: '60%'
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    width: '20%'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '20%'
  }
]


function List(props) {
  return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
  )
}

export default List
