import React, {useEffect, useState} from 'react'
import {Button, message, Table} from "antd"
import {EditorApi, IChangeEditorApi} from "../../request/api"
import {SERVER_PORT} from '../../config'

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar'
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '编辑权限',
    dataIndex: 'editable',
    key: 'editable'
  },
  {
    title: '权限操作',
    dataIndex: 'btn',
    key: 'btn',
    width: '30%'
  }
]

// const dataSource = [
//   {
//     key: 1,
//     avatar: <img src="" alt="头像" />,
//     username: 'lesenelir',
//     role: '编辑人员',
//     editable: 1,
//     btn: (
//         <>
//           <Button>开通编辑权限</Button>
//           <Button style={{marginLeft: '20px'}} danger>撤销编辑权限</Button>
//         </>
//     )
//   }
// ]

function NameList(props) {
  const [dataSource, setDataSource] = useState([])
  // const [num, setNum] = useState(0)

  const openEditable = (id) => {
    IChangeEditorApi({
      id,
      open: 1
    }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        window.location.reload()
      } else {
        message.error(res.message)
      }
    })
  }

  const closeEditable = (id) => {
    IChangeEditorApi({
      id,
      open: 2
    }).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        window.location.reload()
      } else {
        message.error(res.message)
      }
    })
  }

  useEffect(() => {
    // 获取用户列表
    EditorApi().then(res => {
      console.log(res)
      if (res.errCode === 0) {
        message.success(res.message)
        let newArr = []
        res.data.forEach((item) => {
          let obj = {
            key: item.id,
            avatar: <img style={{borderRadius: '50%'}} src={SERVER_PORT + '/' + item.avatar} alt='头像' width="40" height="40" />,
            username: item.username,
            role: item.role === 'vip' ? '管理员' : '普通用户',
            editable: item.editable === 1 ? '已开通' : '未开通',
            btn: (
                <>
                  <Button onClick={() => openEditable(item.id)}>
                    开通编辑权限
                  </Button>
                  <Button
                      onClick={() => closeEditable(item.id)}
                      style={{marginLeft: '20px'}}
                      danger
                  >
                    撤销编辑权限
                  </Button>
                </>
            )
          }
          newArr.push(obj)
        })
        setDataSource(newArr)
      } else {
        message.error(res.message)
      }
    })
  }, [])


  return (
      <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
  )
}

export default NameList
