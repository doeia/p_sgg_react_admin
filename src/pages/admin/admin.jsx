import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: 'white' }}>Content</Content>
                    <Footer style={{ textAlign: 'center', color: '#aaaaaa' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout >
        )
    }
}
