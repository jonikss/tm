import React, { Component } from 'react';
import { string, array, bool, func } from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import * as categoriesActions from '../../actions/categories';
//import * as templatesActions from '../../actions/templates';

import './index.styl';


const Category = ({id, count, name, selected, clickOnLink, toggleCheckbox}) => {
    console.log()
    return <li className='categories__item'>
        <input onChange={toggleCheckbox(id)} className='categories__checkbox' checked={selected.includes(id) ? true : false} type='checkbox' name='category' id={'category_' + id} />
        <label  htmlFor={'category_' + id} className='categories__label'>
        </label>
        <span onClick={clickOnLink(id)} className='categories__link'>{name} <span className='categories__count'>{count}</span></span>
    </li>;
}

@withRouter
@connect(
    (state, props) => state.categories,
    dispatch => ({
        fetchCategories: bindActionCreators(categoriesActions, dispatch).fetchCategories,
    })
)
class Categories extends Component {

    static propTypes = {
        fetchCategories: func.isRequired,
        items: array.isRequired,
        error: bool.isRequired,
        errorMsg: string.isRequired,
        loading: bool.isRequired
    }

    static defaultProps = {
        items: [],
        error: false,
        errorMsg: '',
        loading: false
    }

    componentWillMount() {
        if(this.props.items.length === 0){
            this.props.fetchCategories();
        }

        console.log('Categories componentWillMount')
    }

    clickOnLink = id => e => {
        const { history } = this.props;
        history.push(`/categories/${id}/`);
    }

    toggleCheckbox = id => e => {

        const { match, history } = this.props;
        let selected = [];

        if(match.params.categories){
            selected = match.params.categories.split(',').map(Number);
        }

        if(selected.includes(id)) {
            selected = selected.filter(sel => sel !== id)
        } else {
            selected.push(id);
        }
        if(selected.length > 0){
            history.push(`/categories/${selected.join(',')}/`);
        } else {
            history.push('/');
        }

    }

    render() {
        const { items, error, errorMsg, loading, match, history } = this.props;
        let selected = [];
        if(match.params.categories){
            selected = match.params.categories.split(',').map(Number);
        }
        return <div className='categories'>
            <h3 className='categories__title'>Поиск шаблонов</h3>
            <div className='categories__wrap'>
                <ul className='categories__items'>
                    {
                        items && items.length > 0
                        ?
                            items.map(item => <Category clickOnLink={this.clickOnLink} toggleCheckbox={this.toggleCheckbox} key={item.id} selected={selected} {...item}/>)
                        :
                            ''
                    }
                </ul>
        </div>
    </div>;
    }
}

export default Categories;
