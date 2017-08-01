const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    template_id: {
        type: Number,
        unique: true
    },
    price: Number,
    exc_price: Number,
    downloads: Number,
    inserted_date: Date,
    update_date: Date,
    screenshots: [String],
    categories: [Number],
    keywords: [String]

});

templateSchema.statics.getFullCategoriesList = function() {
    return this.aggregate([{
            $unwind: '$categories'
        },
        {
            $group: {
                _id: '$categories',
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);
};

templateSchema.statics.getTemplatesAndCount = function(params = {skip:0, limit:20, sort: 'desc'}) {

    let search = {};

    if(params.categories && params.tags) {
        search = { $and: [ {categories: { $in : params.categories } }, { keywords: { $all : params.tags } } ] };
    } else if(params.categories) {
        search = {categories: { $in : params.categories }};
    } else if(params.tags) {
        search = {keywords: { $all : params.tags }};
    }

    const templates = this
        .find(search, {_id: 0, __v: 0})
        .skip(params.skip)
        .limit(params.limit)
        .sort({
            template_id: params.sort
        });
    const count = this
        .find(search)
        .count();

    return Promise.all([templates, count]);
};

templateSchema.statics.getTemplate = function(id) {
    return this.findOne({
        template_id: id
    });
};

templateSchema.statics.getTags = function(categories) {
    console.log(categories)
    let search = {};

    if(categories) {
        search = {categories: { $in : categories }};
    }

    return this.aggregate([
        {
            $match: search
        },
        {
            $unwind: '$keywords'
        },
        {
            $group: {
                _id: '$keywords',
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);
};

module.exports = mongoose.model('Template', templateSchema);
