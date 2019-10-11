import React, { Component } from 'react';
import { Spin } from 'antd';

/**
 * 加载页面
 * @param {Component} children - 对应props.children
 * @param {Boolean} isLoading - 是否正在加载
 */
class Loading extends Component {
    render() {
        let { children, isLoading } = this.props;

        return isLoading ? <Spin size="large" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }} /> : children;
    }
}

export default Loading;