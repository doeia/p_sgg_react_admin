import ajax from './ajax'
// const BASE = 'http://localhost:5000'
const BASE = ''

// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')
//添加
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')