import {FETCH_TAGS_REQUEST, FETCH_TAGS_FAILURE, FETCH_TAGS_SUCCESS} from '../actions/tags';

const initialState = {
    loading: false,
    items: [],
    error: false,
    errorMsg: ''
}

export default (state = initialState, {type, payload, error}) => {
    switch (type) {
        case FETCH_TAGS_REQUEST:
            return {...state, loading: true};
        case FETCH_TAGS_SUCCESS:
            return {...state, loading: false, items: payload, error: false};
        case FETCH_TAGS_FAILURE:
            return {...state, loading: false, error: true, items:[], errorMsg: payload};
        default:
            return state;
    }
};
