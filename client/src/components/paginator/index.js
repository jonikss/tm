import React, { Component } from 'react';
import { getPaginationModel, ITEM_TYPES } from 'ultimate-pagination';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import getTemplatesUrlFromParams from '../../util/getTemplatesUrlFromParams';
import './index.styl';

@withRouter
@connect(
    (state, props) => state.paginator
)
class Paginator extends Component {

    render() {
        console.log('this.props',this.props)
        const {match, page, pages} = this.props;
        const items = getPaginationModel({
            currentPage: page,
            totalPages: pages,
            boundaryPagesRange: 1,
            siblingPagesRange: 1,
            hideEllipsis: false,
            hidePreviousAndNextPageLinks: false,
            hideFirstAndLastPageLinks: false
        });
        return (
            pages > 1
            ?
            <nav className='paginator'>
                <ul className='paginator__items'>
                    {items.map((item, i) => {
                        let itemContent;
                        if (item.type === ITEM_TYPES.FIRST_PAGE_LINK) {
                            itemContent = item.isActive
                                ? <span className='paginator__item-span'>
                                      {'|<'}
                                  </span>
                                : <Link to={getTemplatesUrlFromParams({...match.params, page:item.value})} className='paginator__item-link'>
                                      {'|<'}
                                  </Link>;
                        } else if (item.type === ITEM_TYPES.PREVIOUS_PAGE_LINK) {
                            itemContent = item.isActive
                                ? <span className='paginator__item-span'>
                                      {'<'}
                                  </span>
                                : <Link to={getTemplatesUrlFromParams({...match.params, page:item.value})} className='paginator__item-link'>
                                      {'<'}
                                  </Link>;;
                        } else if (item.type === ITEM_TYPES.PAGE) {
                            itemContent = item.isActive
                                ? <span className='paginator__item-span'>
                                      {item.value}
                                  </span>
                                : <Link to={getTemplatesUrlFromParams({...match.params, page:item.value})} className='paginator__item-link'>
                                      {item.value}
                                  </Link>;;
                        } else if (item.type === ITEM_TYPES.ELLIPSIS) {
                            itemContent = (
                                <span className='paginator__item-dots'>
                                    {'...'}
                                </span>
                            );
                        } else if (item.type === ITEM_TYPES.LAST_PAGE_LINK) {
                            itemContent = item.isActive
                                ? <span className='paginator__item-span'>
                                      {'>|'}
                                  </span>
                                : <Link to={getTemplatesUrlFromParams({...match.params, page:item.value})} className='paginator__item-link'>
                                      {'>|'}
                                  </Link>;;
                        } else if (item.type === ITEM_TYPES.NEXT_PAGE_LINK) {
                            itemContent = item.isActive
                                ? <span className='paginator__item-span'>
                                      {'>'}
                                  </span>
                                : <Link to={getTemplatesUrlFromParams({...match.params, page:item.value})} className='paginator__item-link'>
                                      {'>'}
                                  </Link>;;
                        }

                        return (
                            <li key={i} className='paginator__item'>
                                {itemContent}
                            </li>
                        );
                    })}
                </ul>
            </nav>
            :
            <nav className='paginator'></nav>
        );
    }
};

export default Paginator;
