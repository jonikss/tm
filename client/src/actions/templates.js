
export const FETCH_TEMPLATES_REQUEST = 'FETCH_TEMPLATES_REQUEST';
export const FETCH_TEMPLATES_FAILURE = 'FETCH_TEMPLATES_FAILURE';
export const FETCH_TEMPLATES_SUCCESS = 'FETCH_TEMPLATES_SUCCESS';

export const  fetchTemplates = (path = '') => async (dispatch, getState) => {

    let url = '/api/templates' + path;

    dispatch({
        type: FETCH_TEMPLATES_REQUEST
    });

    try {
        console.log('api fetch url', url);
        const response = await fetch(url);
        const templatesData = await response.json();
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        dispatch({
            type: FETCH_TEMPLATES_SUCCESS,
            payload: templatesData,
            error: false
        });
    } catch (error) {
        console.log('error', error)
        dispatch({
            type: FETCH_TEMPLATES_FAILURE,
            payload: error.message,
            error: true
        });
    }
}
