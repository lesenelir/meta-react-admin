import { Layout } from 'antd'

import React, {useState} from "react"

import HomeLeft from "../../components/HomeLeft/HomeLeft"
import HomeRight from "../../components/HomeRight/HomeRight"


// 后台页面
function Home() {
  // collapsed折叠值
  const [collapsed, setCollapsed] = useState(false)

  return (
      <Layout style={{ minHeight: '100vh'}}>
        {/*左侧边栏*/}
        <HomeLeft collapsed={collapsed} />

        {/*/!*对右侧进行布局*!/*/}
        <HomeRight collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
  )
}

export default Home
