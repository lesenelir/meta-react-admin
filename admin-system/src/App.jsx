import React from "react"
import {Outlet} from "react-router-dom"

// 后台页面
function App() {
  return (
      <div>
        App
        <Outlet/>
      </div>
  )
}

export default App
