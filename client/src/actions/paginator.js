export const SET_PAGINATOR = 'SET_PAGINATOR';

export const setPaginator = ({page, pages, count}) => ({
    type: SET_PAGINATOR,
    payload: {page, pages, count}
});
