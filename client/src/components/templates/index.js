import React, { Component } from 'react';
import './index.styl';
import Template from '../template';
import Paginator from '../paginator';
import ScrollToTop from '../scrolltotop';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as templatesActions from '../../actions/templates';
import { Helmet } from 'react-helmet';

@withRouter
@connect(
    (state, props) => state.templates,
    dispatch => ({
        fetchTemplates: bindActionCreators(templatesActions, dispatch)
            .fetchTemplates
    })
)
class Templates extends Component {
    componentDidMount() {
        const { match } = this.props;
        this.props.fetchTemplates(match.url);
    }

    componentDidUpdate(nextProps) {
        const { match } = this.props;
        if (nextProps.location.key !== this.props.location.key) {
            this.props.fetchTemplates(match.url);
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
            <div className='templates'>
                <ScrollToTop />
                <Helmet>
                    <title>Шаблоны</title>
                    <meta name='description' content='Helmet application' />
                </Helmet>
                <h3 className='templates__title'> Шаблоны </h3>
                {
                    loading
                    ?   <p className='templates__loading'> Идет загрузка </p>
                    :   <div>
                            <div className='templates__items'>
                                {items && items.length > 0
                                    ? items.map(item =>
                                        <div
                                            key={item.template_id}
                                            className='templates__item'>
                                            <Template {...item} />
                                        </div>
                                    )
                                    : ''}
                          </div>
                          <div className='templates__paginator'>
                                <Paginator
                                    pages={pages}
                                    page={page}
                                    match={match}
                                />
                          </div>
                        </div>
                  }
            </div>
        );
    }
}

export default Templates;
