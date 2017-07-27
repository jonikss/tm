import {FETCH_TEMPLATES_REQUEST, FETCH_TEMPLATES_FAILURE, FETCH_TEMPLATES_SUCCESS} from '../actions/templates';

const initialState = {
    loading: false,
    items: [],
    page: 1,
    pages: 1,
    count: 0,
    error: false,
    errorMsg: ''
}


export default (state = initialState, {type, payload, error}) => {
    switch (type) {
        case FETCH_TEMPLATES_REQUEST:
            return {...state, loading: true};
        case FETCH_TEMPLATES_SUCCESS:
            return {...state, loading: false, items: payload.templates, page: payload.page, pages: payload.pages, count: payload.count, error: false};
        case FETCH_TEMPLATES_FAILURE:
            return {...state, loading: false, error: true, items:[], errorMsg: payload};
        default:
            return state;
    }
};
