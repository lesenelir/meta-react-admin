import React, {useState} from 'react'
import MyRouter from "./router"

import KeyContext from "./context/context"

// 给KeyContext注入一个对象，该对象有初始值，可以一个修改该初始值的方法
function App() {
  const [key, setKey] = useState(1)

  const changeKeyFn = () => {
    setKey(key + 1)
  }

  return (
      <KeyContext.Provider value={{key, changeKeyFn}}>
        <MyRouter/>
      </KeyContext.Provider>
  )
}

export default App
