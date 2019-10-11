import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';

class NotFound extends Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="页面未找到"
                extra={<Button type="primary" onClick={() => this.props.history.replace('/')}>回到首页</Button>}
            />
        );
    }
}

export default withRouter(NotFound);