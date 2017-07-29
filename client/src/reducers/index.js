import templates from './templates';
import categories from './categories';
import paginator from './paginator';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    templates,
    categories,
    paginator
});

export default rootReducer;
