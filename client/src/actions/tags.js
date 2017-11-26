export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

export const  fetchTags = (path = '') => async (dispatch, getState) => {

    let url = '/api/tags' + path;

    dispatch({
        type: FETCH_TAGS_REQUEST
    });

    try {
        const response = await fetch(url);
        const tagsData = await response.json();
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        dispatch({
            type: FETCH_TAGS_SUCCESS,
            payload: tagsData,
            error: false
        });
    } catch (error) {
        console.log('error', error)
        dispatch({
            type: FETCH_TAGS_FAILURE,
            payload: error.message,
            error: true
        });
    }
}
