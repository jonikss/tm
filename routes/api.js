const express = require('express');
const path = require('path');
const router = express.Router();
const errorHandlers = require('../handlers/errorHandlers');
const { catchErrors } = require('../handlers/errorHandlers');
const templateController = require('../controllers/templateController');

const app = express();

router.param('categories', templateController.validateCategoriesParams);
router.param('tags', templateController.validateTagsParams); 

// Do work here
router.get('/', (req, res) => {
  res.json('Api works!');
});


router.get(
    '/template/:id([0-9]+)',
    catchErrors(templateController.getTemplate)
);

router.get(
    [
        '/templates',
        '/templates/sort/:sort',
        '/templates/page/:page',
        '/templates/page/:page/sort/:sort',

        '/templates/categories/:categories',
        '/templates/categories/:categories/page/:page',
        '/templates/categories/:categories/sort/:sort',
        '/templates/categories/:categories/page/:page/sort/:sort',

        '/templates/tags/:tags',
        '/templates/tags/:tags/page/:page',
        '/templates/tags/:tags/sort/:sort',
        '/templates/tags/:tags/page/:page/sort/:sort',

        '/templates/categories/:categories/tags/:tags',
        '/templates/categories/:categories/tags/:tags/page/:page',
        '/templates/categories/:categories/tags/:tags/sort/:sort',
        '/templates/categories/:categories/tags/:tags/page/:page/sort/:sort',
    ],
    catchErrors(templateController.getTemplates)
);

router.get(
    [
        '/categories',
        '/categories/locale/:locale(cz|en|de|dk|du|es|fi|fr|hu|it|pl|pt|ro|tr)'
    ],
    catchErrors(templateController.getCategories)
);

router.get(
    [
        '/tags',
        '/tags/categories/:categories'
    ],
    catchErrors(templateController.getTags)
);

router.get(
    [
        '/images/:id.png',
        '/images/:width/:id.png',
        '/images/:width/:height/:id.png'
    ],
    catchErrors(templateController.getImg)
);


// If that above routes didnt work, we 404 them and forward to error handler
router.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    router.use(errorHandlers.developmentErrors);
}

// production error handler
router.use(errorHandlers.productionErrors);


module.exports = router;
