
Loading.jsx 登录页
Register.jsx 注册页

App.jsx 是登录后的主页面


index.js是整个项目的入口文件


page文件夹 - APP的页面
components文件夹  - 组件



路由懒加载

App.jsx 后台布局 总体是一个两栏布局 - 左 右区域


react前端项目用TS类型的好处：
- 后台项目接口返回值是一个对象（ctx.body），对象中的属性对前台而言是不知道的
  所以前端axios成功回调的数据类型就是一个问题， 一般情况下，会console.log进行打印输出判断


登录成功
token 保存在 localStorage 和 redux
不只保存在localStorage原因：虽然已经在componentDidMount拿到了用户数据，但是没办法让他更新，只能通过刷新页面去更新
> 让组件更新的方式：key标记组件，key一变，组件就更新

保存在redux原因：
- redux保存key ， 左边侧边栏可以直接触发key，所以需要把key保存在全局



menu 菜单匹配路由在4.20.0 有更新
<= 4.20.0 匹配路由是在Menu.Item 中设置，
>4.20.0后 menu的匹配是由一个包含对象的数组来显示，在该数组的每一个子项对象中添加oClick方法，点击进行编程式路由导航
from -> antd Github仓库的issue 和 discussions中获得方法
react-router-v6开始起步的文档没有介绍编程式导航的hook


React 钩子来更新子组件的值，然后使用useContext此上下文的钩子触发任何组件的组件重新渲染


context 传入一个值，但是不知道怎么去更新这个值，可以在context中传入一个对象
搭配useState后，context才具备响应式
useEffect 监控context.key的数据变化，变化后，从localStorage中读取数据，进行修改


antd的hook ： 比如有Form.useForm() 的hook



useCallback hook使用:
为了更好的调用封装函数（需要封装请求方法 getListFn），把useEffect中的内容提取进行封装，并由useEffect进行直接调用会报警告
useEffect(() => {
  getListFn()
}, [])
React Hook useEffect has a missing dependency: 'getListFn'. Either include it or remove the dependency array


// 此时会出现无限调用
useEffect(() => {
   getListFn()
}, [getListFn])
The 'getListFn' function makes the dependencies of useEffect Hook (at line 98) change on every render. To fix this, wrap the definition of 'getListFn' in its own useCallback() Hook  react-hooks/exhaustive-deps

// 出现无限调用，使用callback hook
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


useMemo是一种性能优化的手段



//
useEffect中axios请求，没有依赖项，则会请求两次，didMount , update






