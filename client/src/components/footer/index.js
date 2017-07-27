import React, { Component } from 'react';
import './index.styl';

class Footer extends Component {
    render() {
        return <footer className='footer'>
            <div className='footer__wrap'>
                <p className='footer__copyright'><span>WordPress</span> Themes  © 2017</p>
            </div>
        </footer>;
    }
}

export default Footer;
