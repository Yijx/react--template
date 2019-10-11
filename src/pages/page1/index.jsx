import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page1 extends Component {
    render() {
        return (
            <div>
                <Link to='/page2'>page1</Link>
            </div>
        );
    }
}

export default Page1;
