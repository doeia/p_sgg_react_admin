import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.css'
import logo from './images/logo.png'
const Item = Form.Item

class Login extends Component {

    /*
    登陆
    */
    login = (e) => {
        // 阻止事件默认行为(不提交表单)
        e.preventDefault()
        // 进行表单所有控件的校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 校验成功
                const { username, password } = values
                console.log('提交登陆请求', username, password)
            } else {
                // 校验失败
                console.log(err)
            }
        })
    }

    /**
    * 自定义表单的校验规则
    */
    validator = (rule, value, callback) => {
        // console.log(rule, value)
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('必须输入密码')
        } else if (length < 4) {
            callback('密码必须大于4 位')
        } else if (length > 12) {
            callback('密码必须小于12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback() // 必须调用callback
        }
    }

    render() {
        const form = this.props.form
        const { getFieldDecorator } = form

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">

                    <h2>用户登录</h2>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        { required: true, whitespace: true, message: '必须输入用户名' },
                                        { min: 4, message: '用户名必须大于4 位' },
                                        { max: 12, message: '用户名必须小于12 位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名" />
                                )
                            }
                        </Item>

                        <Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { validator: this.validator }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password" placeholder="密码" />
                                )
                            }

                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>

                </section>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin
