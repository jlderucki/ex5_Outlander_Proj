const express = require('express');

const router = express.Router();

module.exports = params => {
  const { itemService } = params;

  router.get('/', async (request, response) => {
    const categories = await itemService.getCategoriesList();
    response.render('layout', { pageTitle: 'All Items By Category', template: 'all-categories', categories });
  });

  router.get('/:category', async (request, response) => {
      const catItems = await itemService.getItemsByCategory(request.params.category);
      response.render('layout', {
        pageTitle: catItems[0].category,
        template: 'category',
        catItems
      });
  });

  return router;
};
