
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




