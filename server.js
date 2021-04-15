const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const ItemService = require('./services/ItemService');

const feedbackService = new FeedbackService('./data/feedback.json');
const itemService = new ItemService('./data/items.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Outlander';
app.locals.siteSubName = 'Locations from the Best-Selling Series'

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  const items = await itemService.getItems();
  const categories = await itemService.getCategories();
  response.locals.itemNames = items;
  response.locals.catNames = categories;
  return next();
});

app.use('/', routes({
    feedbackService,
    itemService,
  })
);


app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
