import React, { Component } from 'react';
import NoramalTable from 'component/Table/NaromalTable.jsx';
import './Home';

class Header extends Component {
    render() {
        return (
            <div className="bfdHome">
                <div>表格样式1</div>
                <NoramalTable/>
            </div>
        );
    }
}

export default Header;
