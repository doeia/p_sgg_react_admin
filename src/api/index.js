import ajax from './ajax';
import jsonp from 'jsonp';
// const BASE = 'http://localhost:5000'
const BASE = ''

// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')
//添加
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
/*
通过jsonp 请求获取天气信息
*/
export function reqWeather(city) {
    const url =
        `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url, {
            param: 'callback'
        }, (error, response) => {
            if (!error && response.status == 'success') {
                const { dayPictureUrl, weather } = response.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                alert('获取天气信息失败')
            }
        })
    })
}