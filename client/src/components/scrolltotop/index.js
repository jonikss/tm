import React, { Component } from 'react';

class ScrollToTop extends Component {

    scrollToTop(scrollDuration) {
        let cosParameter = window.scrollY / 2;
        let scrollCount = 0;
        let oldTimestamp = performance.now();
        let distanceToTop = document.getElementById('ScrollToTop').offsetTop;
        //let direction = (window.scrollY - distanceToTop)/ Math.abs(window.scrollY - distanceToTop);
        //alert(window.scrollY)

        function step(newTimestamp) {
            scrollCount = scrollCount + Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
            if (scrollCount >= Math.PI) window.scrollTo(0, distanceToTop);
            if (window.scrollY < distanceToTop ) return;
            window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    componentDidMount(prevProps) {
        //window.scrollTo(0, 0);
        this.scrollToTop(1000);
    }

    render() {
        return <span id='ScrollToTop' />;
    }
}

export default ScrollToTop;
