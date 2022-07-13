import React, {useCallback, useEffect, useState} from "react"
import {Button, message, Table, Pagination} from "antd"

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
        props.getListFn(props.current, 10)
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
  // 分页总数据
  const [total, setTotal] = useState(50)
  // 分页当前页码
  const [current, setCurrent] = useState(1)

  // 封装请求的方法
  const getListFn = useCallback( (page, pageSize) => {
    GetArticleListApi({
      current: page,
      counts: pageSize
    }).then(res => {
      let newArr = []
      // 设置总数据
      setTotal(res.data.total)
      // 设置当前页，每页个数
      setCurrent(res.data.current)
      res.data.arr.map((item) => {
        let obj = {
          key: item.id,
          title: <TitleComp title={item.title} subTitle={item.subTitle} />,
          time: new Date(item.date).toISOString().substring(0, 10),
          operation: <OperationButton current={current} getListFn={getListFn} id={item.id} />
        }
        return newArr.push(obj)
      })
      setDataSource(newArr)
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getListFn(1, 10)
  }, [getListFn])


  const onPageChange = (page, pageSize) => { // 当前页码，该页码有多少条数据
    getListFn(page, pageSize)
  }

  return (
      <div>
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
        />

        <Pagination
            onChange={onPageChange}
            defaultCurrent={1}
            total={total}
        />

      </div>
  )
}

export default List
