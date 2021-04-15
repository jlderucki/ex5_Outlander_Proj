const express = require('express');

const router = express.Router();

module.exports = params => {
  const { itemService } = params;

  router.get('/', async (request, response) => {
    const items = await itemService.getList();
    response.render('layout', { pageTitle: 'All Items', template: 'items', items });
  });

  router.get('/:id', async (request, response, next) => {
      const item = await itemService.getItem(request.params.id);
      response.render('layout', {
        pageTitle: item.name,
        template: 'item-detail',
        item
      });
  });

  return router;
};
