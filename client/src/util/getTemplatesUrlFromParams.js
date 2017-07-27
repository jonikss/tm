export default  ({ categories, tags, page, sort }) => {
    let url = '/';
    let urlCategories;
    let urlTags;
    
    if(typeof categories === 'string' || typeof categories === 'number' ) {
        urlCategories = categories;
    } else if(Array.isArray(categories)){
        urlCategories = categories.join(',');
    }

    if(typeof tags === 'string' ) {
        urlTags = tags;
    } else if(Array.isArray(tags)){
        urlTags = tags.join(',');
    }


    if(categories) {
        url = url + `categories/${urlCategories}/`;
    }
    if(tags) {
        url = url + `tags/${urlTags}/`;
    }
    if(page && page > 1) {
        url = url + `page/${page}/`;
    }
    if(sort && sort === 'asc') {
        url = url + `sort/${sort}/`;
    }

    return url;
}
