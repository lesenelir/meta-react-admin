const defaultState = {
  // HomeRight组件Header的key
  key: 1
}

// eslint-disable-next-line
export default (state=defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    // 修改key
    case 'changeKey':
      newState.key++
      break
    default:
      break
  }
  return newState
}

