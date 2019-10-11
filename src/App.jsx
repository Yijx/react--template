import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Root from 'router';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

class App extends Component {
    render() {
        return (
            <div className={cx('app')}>
                <Root />
            </div>
        );
    }
}

export default App;
