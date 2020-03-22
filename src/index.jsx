import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App'


// 如果local 中保存了user, 将user 保存到内存中
const user = storageUtils.getUser()
if (user && user._id) {
    memoryUtils.user = user
}

ReactDOM.render(<App />, document.getElementById('root'))