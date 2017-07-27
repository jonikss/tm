export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const  fetchCategories = () => async dispatch => {

    dispatch({
        type: FETCH_CATEGORIES_REQUEST
    });

    try {
        const response = await fetch('/api/categories/');
        const categoriesData = await response.json();
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: categoriesData,
            error: false
        });
    } catch (error) {
        console.log('error', error.message)
        dispatch({
            type: FETCH_CATEGORIES_FAILURE,
            payload: error.message,
            error: true
        });
    }
}
