import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS } from '../actions/categories';

const initialState = {
    loading: false,
    items: [],
    error: false,
    errorMsg: ''
}

export default (state = initialState, {type, payload, error}) => {
    switch (type) {
        case FETCH_CATEGORIES_REQUEST:
            return {...state, loading: true};
        case FETCH_CATEGORIES_FAILURE:
            return {...state, loading: false, error: true, items:[], errorMsg: payload};
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, loading: false, items: payload, error: false};
        default:
            return state;
    }
};
