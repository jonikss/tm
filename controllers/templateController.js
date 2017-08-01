const mongoose = require('mongoose');
const Template = require('../models/template');
const fetch = require('node-fetch');
const request = require('request');
const { BadRequestError, NotFoundError } = require('../errors');

exports.getTemplates = async(req, res, next) => {

    const page = Number(req.params.page || 1);
    const sort = req.params.sort || 'desc';
    const limit = 24;
    const skip = (page * limit) - limit;
    const categories = req.categories;
    const tags = req.tags;

    if(!page) {
        throw new BadRequestError('Incorrect page param');
    }

    if(!(sort === 'desc' || sort === 'asc')) {
        throw new BadRequestError('Incorrect sort param');
    }

    const [templates, count] = await Template.getTemplatesAndCount({
        skip,
        limit,
        sort,
        categories,
        tags
    });

    if (!templates.length && skip) {
        throw new BadRequestError('Incorrect page params');
    }

    res.json({
        templates,
        page,
        pages: Math.ceil(count / limit),
        count
    });

};

exports.getCategories = async(req, res) => {
    const locale = req.params.locale || 'ru';
    const url = `http://www.templatemonster.com/webapi/categories.php?login=ncwebpros&webapipassword=10bf48732005c805d6379fd0b514b349&delim=|&locale=${locale}`;
    const response = await fetch(url);

    if(response.status !== 200) {
        throw new Error('Can not access file');
    }

    const data = await response.text();

    if(data === 'Unauthorized usage') {
        throw new Error('Unauthorized usage');
    }

    const nameFromId = data.split('\r\n').map(item => item.split('|')).reduce((prev, curr) => {
        prev[curr[0]] = curr[1];
        return prev;
    },{});

    const allAvailableCategories = await Template.getFullCategoriesList();

    const categories = allAvailableCategories.map(category => {
        return {
            id: category._id,
            name: nameFromId[category._id],
            count: category.count
        };
    });

    res.json(categories);
};

exports.getTemplate = async (req, res, next) => {
    const id = Number(req.params.id);
    if(!id) {
        throw new BadRequestError('Incorrect id param');
    }
    const template = await Template.getTemplate(id);
    if(!template) {
        throw new NotFoundError('Template not exist');
    }
    res.json(template);
}


exports.getTags = async(req, res) => {
    const categoriesArray = req.categories;
    let tags = await Template.getTags(categoriesArray);
    tags = tags.map(tag => {return {name:tag._id, count:tag.count}});
    res.json(tags);
};

exports.getImg = async(req, res) => {
    const id = Number(req.params.id);
    const width = Number(req.params.width);
    const height = Number(req.params.height);
    if(!id) {
        throw new BadRequestError('Incorrect id param');
    }

    let url = `https://s.tmimgcdn.com/scr/${(~~(id/100))*100}/${id}-original.jpg`;

    if(width && height) {
        url = `https://s.tmimgcdn.com/scr/${(~~(id/100))*100}/${id}-original.jpg?width=${width}&height=${height}`;
    } else if(height) {
        url = `https://s.tmimgcdn.com/scr/${(~~(id/100))*100}/${id}-original.jpg?height=${height}`;
    } else if(width) {
        url = `https://s.tmimgcdn.com/scr/${(~~(id/100))*100}/${id}-original.jpg?width=${width}`;
    }

    request(url).pipe(res);
};

exports.validateCategoriesParams = async(req, res, next, categories) => {

    try {
        const categoriesArray = categories.split(',').map(Math.abs);

        if(categoriesArray.some(cat => !cat)) {
            throw new BadRequestError('Incorrect categories ids');
        }

        const allCategories = await Template.getFullCategoriesList();
        const categoryIds = allCategories.map(cat => cat._id);

        if(!categoriesArray.every(cat => categoryIds.includes(cat))) {
            throw new BadRequestError('Not existing ids');
        }

        req.categories = categoriesArray;

        next();

    } catch (err) {
        next(err);
    }

}

exports.validateTagsParams = async(req, res, next, tags) => {

    try {
        const tagsArray = req.params.tags.split(',');

        const allTags = await Template.getTags();
        const allTagsArray = allTags.map(tag => tag._id);

        if(!tagsArray.every(tag => allTagsArray.includes(tag))) {
            throw new BadRequestError('Not existing tags');
        }

        req.tags = tagsArray;

        next();

    } catch (err) {
        next(err);
    }

}
