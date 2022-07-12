import React, {useEffect, useState} from "react"
import {Button, Table} from "antd"

import './List.css'
import {GetArticleListApi} from "../../request/api"
import {useNavigate} from "react-router-dom"

// 按钮组件
function OperationButton(props) {
  const navigate = useNavigate()
  // console.log(props, 'sssss')
  const goToEdit = () => {
    navigate(`/edit/${props.id}`)
  }

  return (
      <>
        <Button shape="round" style={{marginRight: '12px'}} onClick={goToEdit}>编辑</Button>
        <Button shape="round" danger>删除</Button>
      </>
  )
}

// 标题组件
function TitleComp(props) {
  return (
      <>
        <div>
          <a href="!#">{props.title}</a>
        </div>
        <p style={{color: '#A9A9A9'}}>{props.subTitle || ''}</p>
      </>
  )
}

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


function List() {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    GetArticleListApi().then(res => {
      console.log(res.data)
      let newArr = [],
          obj
      res.data.map((item) => {
        obj = {
          key: item.id,
          title: <TitleComp title={item.title} subTitle={item.subTitle} />,
          time: item.date,
          operation: <OperationButton id={item.id} />
        }
        return newArr.push(obj)
      })
      setDataSource(newArr)
    })
  }, [])


  return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
  )
}

export default List
