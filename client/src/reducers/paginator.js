import {SET_PAGINATOR} from '../actions/paginator';

const initialState = {
    page: 1,
    pages: 1,
    count: 0
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_PAGINATOR:
            return {...payload};
        default:
            return state;
    }
};
