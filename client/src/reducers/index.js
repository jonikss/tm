import templates from './templates';
import categories from './categories';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    templates,
    categories
});

export default rootReducer;
