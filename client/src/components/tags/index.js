import React, { Component } from 'react';
import './index.styl';
import Template from '../template';
import ScrollToTop from '../scrolltotop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as tagsActions from '../../actions/tags';

@withRouter
@connect(
    (state, props) => state.tags,
    dispatch => ({
        fetchTags: bindActionCreators(tagsActions, dispatch).fetchTags
    })
)
class Tags extends Component {
    componentDidMount() {
        const { match } = this.props;
        this.props.fetchTags(match.url);
    }

    componentDidUpdate(nextProps) {
        const { match } = this.props;
        if (nextProps.location.key !== this.props.location.key) {
            this.props.fetchTags(match.url);
        }
    }

    render() {
        const {
            items,
            error,
            errorMsg,
            loading,
            match,
            page,
            pages,
            count
        } = this.props;
        return (
            <div className='tags'>
                {
                    loading
                    ?   <p className='tags__loading'> Идет загрузка </p>
                    :
                        <ul className='tags__items'>
                            {items && items.length > 0
                                ? items.map((item,i) =>
                                    <li
                                        key={i}
                                        className='tags__item'>
                                        <a className='tag'>{item.name} <span className='tag__count'>{item.count}</span></a>
                                    </li>
                                )
                                : ''}
                        </ul>
                }

            </div>
        );
    }
}

export default Tags;
