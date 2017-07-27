import React, { Component } from 'react';
import { element, node } from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Categories from '../categories';
import Templates from '../templates';
import './index.styl';

@withRouter
class Main extends Component {
    /*static propTypes = {
        Left: node,
        Right: node,
    };

    static defaultProps = {

    };*/

    render() {
        const { location } = this.props;
        const paths = [
            '/categories/:categories/tags/:tags',
            '/categories/:categories/tags/:tags/page/:page',
            '/categories/:categories/tags/:tags/sort/:sort(desc|asc)',
            '/categories/:categories/tags/:tags/page/:page/sort/:sort(desc|asc)',
            '/tags/:tags',
            '/tags/:tags/page/:page',
            '/tags/:tags/sort/:sort(desc|asc)',
            '/tags/:tags/page/:page/sort/:sort(desc|asc)',
            '/categories/:categories',
            '/categories/:categories/page/:page',
            '/categories/:categories/sort/:sort(desc|asc)',
            '/categories/:categories/page/:page/sort/:sort(desc|asc)',
            '/page/:page/sort/:sort(desc|asc)',
            '/page/:page',
            '/sort/:sort(desc|asc)',
            '/'
        ];
        return (
            <main className='main'>
                <div className='main__wrap'>
                    <div className='main__content'>
                        <div className='main__row'>
                            <div className='main__left'>
                                <Switch>
                                    <Route
                                        path={'/categories/:categories/'}
                                        component={Categories}
                                    />
                                    <Route path={'/'} component={Categories} />
                                </Switch>
                            </div>
                            <div className='main__right'>
                            
                                    <Switch key={location.key}>
                                        {paths.map((path, index) =>
                                            <Route
                                                key={index}
                                                exact
                                                path={path}
                                                component={Templates}
                                            />
                                        )}

                                        <Route
                                            path='*'
                                            render={props => <h3>404</h3>}
                                        />
                                    </Switch>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;
