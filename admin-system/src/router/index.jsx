import Home from "../pages/Home/Home"
import Loading from "../components/Loading/Loading"

import {lazy, Suspense} from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// 路由懒加载：防止加载路由的时候全部引入组件
const routerArr = [
  {
    path: '/',
    component: Home,
    children: [
      {path: 'crypto', component: lazy(() => import('../pages/Crypto/Crypto'))},
      {path: 'list', component: lazy(() => import("../pages/List/List"))},
      {path: 'edit', component: lazy(() => import("../pages/Edit/Edit"))},
      {path: 'edit/:id', component: lazy(() => import("../pages/Edit/Edit"))},
      {path: 'error/404', component: lazy(() => import('../pages/Error/404/Error404'))},
      {path: 'error/403', component: lazy(() => import('../pages/Error/403/Error403'))},
      {path: 'error/500', component: lazy(() => import('../pages/Error/500/Error500'))},
      {path: 'profile', component: lazy(() => import("../pages/Profile/Profile"))},
      {path: 'namelist', component: lazy(() => import('../pages/NameList/NameList'))}
    ]
  },
  {path: '/login', component: lazy(() => import("../pages/Login/Login"))},
  {path: '/register', component: lazy(() => import("../pages/Register/Register"))}
]


// 路由组件
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
