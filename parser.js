const unzip = require('unzip');
const request = require('request');
const xmlNodes = require('xml-nodes');
const xmlObjects = require('xml-objects');
const url = 'http://www.templatemonster.com/webapi/xml/t_info.zip';
console.time('parser');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/template');
mongoose.connection.on('error', err => {
    console.error("Database Connection Error: " + err);
    // Скажите админу пусть включит MongoDB сервер :)
    console.error('Админ сервер MongoDB Запусти!');
    process.exit(2);
});

mongoose.connection.on('connected', () => {
    // Подключение установлено
    console.info("Succesfully connected to MongoDB Database");
    // В дальнейшем здесь мы будем запускать сервер.
});

const Template = require('./models/template');

let template_ids = [];
var query = Template.find({}).select('template_id -_id').then(temps => {
    template_ids = temps.map(temp => temp.template_id);
    console.log(template_ids);
});




request(url)
    .pipe(unzip.Parse())
    .on('entry', entry => {
        const {path, type, size} = entry;
        console.log(path);
        entry.pipe(xmlNodes('template'))
            .pipe(xmlObjects({explicitRoot: false, explicitArray: false, mergeAttrs: true}))
            .on('data', function(data) {
                let template = {};
                const id = Number(data.id[0]);
                const typeId = Number(data.template_type.type_id);
                const state = Number(data.state);
                const is_adult = Number(data.is_adult);
                if( typeId === 17 && state === 1 && !template_ids.includes(id) && is_adult !== 1 ) {
                    console.log('data.categories:', data.categories);
                    template.template_id = id;
                    template.price = Number(data.price);
                    template.exc_price = Number(data.exc_price);
                    template.downloads = Number(data.downloads);
                    template.inserted_date = data.inserted_date;
                    template.update_date = data.update_date;
                    template.screenshots = data.screenshots_list.screenshot.map(screenshot => screenshot.uri);
                    if(data.categories){
                        if(Array.isArray(data.categories.category)) {
                            template.categories = data.categories.category.map(category => category.category_id);
                        } else {
                            template.categories = [data.categories.category.category_id];
                        }
                    }
                    template.keywords = data.keywords.split(' ');
                    const Temp = new Template(template);
                    console.log('template:', template);
                    this.pause();
                    Temp.save( err => {
            			this.resume(err);
            		});

                } else if( template_ids.includes(id) &&  state !== 1) {
                    this.pause();
                    Template.findOneAndRemove({template_id:id}, err => {
                        this.resume(err);
                    });
                } else if( template_ids.includes(id) && is_adult === 1) {
                    this.pause();
                    console.log('Удаляем порнушку');
                    Template.findOneAndRemove({template_id:id}, err => {
                        this.resume(err);
                    });
                }

            });


    })
    .on('close', () => {
        console.log('close');
        console.timeEnd('parser');
        process.exit(2);
    })
    .on('error', err => {
        console.log('error');
        console.log(err);
    });
