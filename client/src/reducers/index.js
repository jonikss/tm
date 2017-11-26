import templates from './templates';
import tags from './tags';
import categories from './categories';
import paginator from './paginator';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    templates,
    tags,
    categories,
    paginator
});

export default rootReducer;
