const express = require('express');

const itemRoute = require('./items');
const categoryRoute = require('./categories');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {
  const { itemService } = params;

  router.get('/', async (request, response) => {
    const topItems = await itemService.getList();
    response.render('layout', { pageTitle: 'Home', template: 'index', topItems });
  });

  router.get('/', async (request, response) => {
    const categories = await itemService.getCategories();
    response.render( 'layout', { pageTitle: 'Home', template: 'index', categories });
  });

  router.use('/items', itemRoute(params));
  router.use('/categories', categoryRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
