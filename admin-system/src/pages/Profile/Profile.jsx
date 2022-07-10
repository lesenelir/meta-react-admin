import React from 'react'
import {UserInfoApi} from "../../request/api"

function Profile() {

  const getUserInfo = () => {
    UserInfoApi().then(res => {
      console.log(res)
    })
  }

  return (
      <div>
        资料页面
        <button onClick={getUserInfo}>获取用户资料</button>
      </div>
  )
}

export default Profile
