import React, {useCallback, useEffect, useState} from "react"
import {Button, message, Table} from "antd"

import './List.css'
import {DeleteArticleApi, GetArticleListApi} from "../../request/api"
import {useNavigate} from "react-router-dom"

// 表格列
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


// 按钮组件
function OperationButton(props) {
  const navigate = useNavigate()

  const goToEdit = () => {
    navigate(`/edit/${props.id}`)
  }

  // 删除文章
  const deleteFn = () => {
    DeleteArticleApi({id: props.id}).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        // 重新请求列表
        props.getListFn()
      } else {
        message.error(res.message)
      }
    })
  }

  return (
      <>
        <Button shape="round" style={{marginRight: '12px'}} onClick={goToEdit}>编辑</Button>
        <Button shape="round" danger onClick={deleteFn}>删除</Button>
      </>
  )
}


// List组件
function List() {
  const [dataSource, setDataSource] = useState([])

  const getListFn = useCallback( () => {
    GetArticleListApi().then(res => {
      let newArr = [],
          obj
      res.data.map((item) => {
        obj = {
          key: item.id,
          title: <TitleComp title={item.title} subTitle={item.subTitle} />,
          time: new Date(item.date).toISOString().substring(0, 10),
          operation: <OperationButton getListFn={getListFn} id={item.id} />
        }
        return newArr.push(obj)
      })
      setDataSource(newArr)
    })
  }, [])

  useEffect(() => {
    getListFn()
  }, [getListFn])


  return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
  )
}

export default List
