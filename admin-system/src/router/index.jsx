import App from "../App"
import Loading from "../components/Loading/Loading"

import {lazy, Suspense} from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// 路由懒加载：防止加载路由的时候全部引入组件
const routerArr = [
  {
    path: '/',
    component: App,
    children: [
      {path: 'list', component: lazy(() => import("../pages/List"))},
      {path: 'edit', component: lazy(() => import("../pages/Edit"))},
      {path: 'profile', component: lazy(() => import("../pages/Profile"))}
    ]
  },
  {path: '/login', component: lazy(() => import("../Login"))},
  {path: '/register', component: lazy(() => import("../Register"))}
]


// 配置路由
const MyRouter = () => {
  return (
      <BrowserRouter>
        <Suspense fallback={<Loading/>}>
          <Routes>
            {
              routerArr.map((item,index) => {
                return (
                    item.children
                    // 有子路由则遍历子路由
                    ? <Route key={index} path={item.path} element={<item.component/>}>
                        {
                          item.children.map((e, i) => <Route key={i} path={e.path} element={<e.component/>}/>)
                        }
                      </Route>
                    // 没有子路由则直接渲染
                    : <Route key={index} path={item.path} element={<item.component/>}/>
                )
              })
            }
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default MyRouter


// const MyRouter = () => {
//   return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/web" element={<App/>}>
//             <Route path="list" element={<List/>}/>
//             <Route path="edit" element={<Edit/>}/>
//             <Route path="profile" element={<Profile/>}/>
//           </Route>
//           <Route path="/login" element={<Loading/>}/>
//           <Route path="/register" element={<Register/>}/>
//         </Routes>
//       </BrowserRouter>
//   )
// }


// Note: BrowserRouter -> (Suspense 懒加载时用) -> Routes -> Route
