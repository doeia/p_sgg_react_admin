import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.css'
import logo from '../../assets/images/logo.png'
import { Menu, Icon, Button } from 'antd';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;

class LeftNav extends Component {

    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {

            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    getMenuNodes = (menuList) => {
        // 得到当前请求的path
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>))
            } else {
                // 如果当前请求路由与当前菜单的某个子菜单的key 匹配, 将菜单的key 保存为openKey
                // if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                //     this.openKey = item.key
                // }
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))

            }
            return pre
        }, [])
    }
    /*
    在第一次render()之前执行一次
    一般可以在此同步为第一次render()准备数据
    */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo}></img>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    //刷新后高亮之前选择的
                    selectedKeys={[path]}
                    //刷新后选择之前选择的
                    defaultOpenKeys={[openKey]}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}

/*
withRouter: 高阶组件: 包装非路由组件返回一个包装后的新组件, 新组件会向被包装组件传递
history/location/match 属性
*/
export default withRouter(LeftNav)