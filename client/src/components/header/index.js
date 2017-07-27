import React, { Component } from 'react';
import './index.styl';

class Header extends Component {
    render() {
        return <header className='header'>
            <div className='header__wrap'>
                <p className='header__logo'>WordPress<span>Themes</span>.ru</p>
            </div>
        </header>
    }
}

export default Header;
