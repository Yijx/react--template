import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { resizeThrottler } from 'common/js/utils';
import routes from 'router';
import Header from 'base/Header';
import Menu from 'base/Menu';
import 'common/style/global.scss';
import 'antd/dist/antd.css';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoWidth: 0
        };
    }
    componentDidMount() {
        this.initPage();
    }
    // 页面主体宽度自适应，屏幕宽度-侧边栏
    initPage = () => {
        this.initWidth();
        window.addEventListener('resize', resizeThrottler(this.initWidth, false));
    };
    initWidth = () => {
        this.setState({
            autoWidth: window.innerWidth - 200 + 'px'
        });
    };
    render() {
        return (
            <BrowserRouter>
                <Header />
                <div className="bfdContent">
                    <Menu />
                    <div
                        className="bfdContentRight"
                        style={{
                            width: this.state.autoWidth
                        }}
                    >
                        {routes.map(route => {
                            return <Route key={route.path} {...route} />;
                        })}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
